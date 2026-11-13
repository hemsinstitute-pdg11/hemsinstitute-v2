import { NextResponse } from "next/server";
import { db } from "@/db";
import {
  participants,
  registrations,
  registrationLogs,
  programs,
  courseSchedules,
} from "@/db/schema";
import { eq, and, sql, count, lte, gte } from "drizzle-orm";
import { z } from "zod";
import { registrationSchema } from "@/lib/validations";

// Simple in-memory rate limiter: max 10 registration attempts per minute per IP.
// Sufficient for Phase 1; a production deployment should use a distributed store.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  entry.count += 1;
  return true;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

const DUPLICATE_WINDOW_HOURS = 24;

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan. Coba lagi dalam beberapa menit." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }

  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Data tidak valid." },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    // Cek duplikasi: nomor telepon + program yang sama dalam window 24 jam
    // dengan status baru atau konfirmasi -> kembalikan pendaftaran yang sudah ada.
    const nowJakarta = new Date();
    const windowStart = new Date(
      nowJakarta.getTime() - DUPLICATE_WINDOW_HOURS * 60 * 60 * 1000,
    );

    const existing = await db
      .select({
        registrationCode: registrations.registrationCode,
        status: registrations.status,
      })
      .from(registrations)
      .innerJoin(participants, eq(participants.id, registrations.participantId))
      .where(
        and(
          eq(registrations.programId, data.programId),
          eq(participants.phone, data.phone),
          gte(registrations.createdAt, windowStart),
        ),
      );

    if (existing.length > 0) {
      return NextResponse.json(
        {
          registrationCode: existing[0].registrationCode,
          status: existing[0].status,
          duplicate: true,
        },
        { status: 409 },
      );
    }

    // Transaksi aman secara konkuren untuk pembuatan nomor registrasi.
    const result = await db.transaction(async (tx) => {
      // Kunci transaksi sehingga antrian nomor registrasi tidak bentrok.
      await tx.execute(sql`SELECT pg_advisory_xact_lock(987654321)`);

      const year = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
      });

      const countRow = await tx
        .select({ c: count() })
        .from(registrations)
        .where(
          sql`registration_code LIKE ${`HI-REG-${year}-%`}`,
        );

      const nextNumber = Number(countRow[0]?.c ?? 0) + 1;
      const registrationCode = `HI-REG-${year}-${String(nextNumber).padStart(5, "0")}`;

      // Simpan data peserta
      const [participant] = await tx
        .insert(participants)
        .values({
          id: crypto.randomUUID(),
          fullName: data.fullName,
          phone: data.phone,
          email: data.email || null,
          birthDate: data.birthDate || null,
          educationLevel: data.educationLevel,
          schoolName: data.schoolName || null,
          guardianName: data.guardianName || null,
          guardianPhone: data.guardianPhone || null,
        })
        .returning();

      // Validasi program aktif
      const [program] = await tx
        .select({ id: programs.id, name: programs.name })
        .from(programs)
        .where(and(eq(programs.id, data.programId), eq(programs.isActive, true)));

      if (!program) {
        throw new Error("Program tidak aktif atau tidak ditemukan.");
      }

      // Validasi jadwal jika dipilih
      if (data.scheduleId) {
        const [schedule] = await tx
          .select({ id: courseSchedules.id })
          .from(courseSchedules)
          .where(
            and(
              eq(courseSchedules.id, data.scheduleId),
              eq(courseSchedules.isActive, true),
              eq(courseSchedules.programId, data.programId),
            ),
          );
        if (!schedule) {
          throw new Error("Jadwal tidak valid untuk program ini.");
        }
      }

      const [registration] = await tx
        .insert(registrations)
        .values({
          id: crypto.randomUUID(),
          registrationCode,
          participantId: participant.id,
          programId: data.programId,
          scheduleId: data.scheduleId || null,
          status: "new",
          learningMethod: data.learningMethod,
          consentAt: data.consent ? new Date() : null,
        })
        .returning();

      await tx.insert(registrationLogs).values({
        id: crypto.randomUUID(),
        registrationId: registration.id,
        status: "new",
        notes: "Pendaftaran diterima melalui website resmi.",
      });

      return {
        registrationCode,
        registrationId: registration.id,
        participantId: participant.id,
        programName: program.name,
      };
    });

    return NextResponse.json({
      success: true,
      registrationCode: result.registrationCode,
      registrationId: result.registrationId,
      participantId: result.participantId,
      programName: result.programName,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan server.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
