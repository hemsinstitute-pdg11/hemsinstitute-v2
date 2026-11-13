import { NextResponse } from "next/server";
import { db } from "@/db";
import { courseSchedules } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const programId = searchParams.get("programId");

  if (!programId) {
    return NextResponse.json({ error: "programId is required" }, { status: 400 });
  }

  try {
    const schedules = await db
      .select({
        id: courseSchedules.id,
        day: courseSchedules.day,
        startTime: courseSchedules.startTime,
        endTime: courseSchedules.endTime,
        learningMethod: courseSchedules.learningMethod,
        capacity: courseSchedules.capacity,
        isActive: courseSchedules.isActive,
      })
      .from(courseSchedules)
      .where(
        and(
          eq(courseSchedules.programId, programId),
          eq(courseSchedules.isActive, true),
        ),
      );

    return NextResponse.json({ schedules });
  } catch {
    return NextResponse.json({ error: "Gagal memuat jadwal" }, { status: 500 });
  }
}
