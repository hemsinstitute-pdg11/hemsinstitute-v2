"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, AlertCircle, CheckCircle, Loader2, Mail, Calendar, Users, Smartphone, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { registrationSchema, type RegistrationInput, EducationLevels } from "@/lib/validations";
import { cn } from "@/lib/utils";

interface ProgramOption {
  id: string;
  name: string;
  slug: string;
  category: string;
}

interface ScheduleOption {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  learningMethod: string;
  capacity: number;
  isActive: boolean;
}

type Step = 1 | 2 | 3 | 4;

interface FormState {
  step: Step;
  programId: string | null;
  scheduleId: string | null;
  learningMethod: string;
  fullName: string;
  phone: string;
  email: string;
  birthDate: string;
  educationLevel: string;
  schoolName: string;
  guardianName: string;
  guardianPhone: string;
  consent: boolean;
}

const emptyState: FormState = {
  step: 1,
  programId: null,
  scheduleId: null,
  learningMethod: "",
  fullName: "",
  phone: "",
  email: "",
  birthDate: "",
  educationLevel: "SMA",
  schoolName: "",
  guardianName: "",
  guardianPhone: "",
  consent: false,
};

export function RegistrationForm({ programs }: { programs: ProgramOption[] }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(emptyState);
  const [schedules, setSchedules] = useState<ScheduleOption[]>([]);
  const [schedulesLoading, setSchedulesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ code: string; name: string; program: string } | null>(null);
  const ignoreRef = useRef(false);

  const stepperItems = [
    { number: 1, label: "Pilih Program" },
    { number: 2, label: "Informasi Peserta" },
    { number: 3, label: "Tinjauan" },
    { number: 4, label: "Selesai" },
  ] as const;

  const fieldLabel: Record<string, string> = {
    fullName: "Nama Lengkap",
    phone: "Nomor WhatsApp",
    email: "Email",
    birthDate: "Tanggal Lahir",
    educationLevel: "Tingkat Pendidikan",
    schoolName: "Sekolah / Perguruan Tinggi",
    guardianName: "Nama Wali Ortu",
    guardianPhone: "Nomor WhatsApp Wali Ortu",
    learningMethod: "Metode Belajar",
  };

  const categoryIcons: Record<string, typeof GraduationCap> = {};

  useEffect(() => {
    if (form.programId) {
      ignoreRef.current = false;
      setSchedules([]);
      setSchedulesLoading(true);
      fetch(`/api/schedules?programId=${encodeURIComponent(form.programId)}`)
        .then(async (res) => {
          if (ignoreRef.current) return;
          if (!res.ok) throw new Error("Gagal memuat jadwal");
          return res.json();
        })
        .then((data) => {
          if (ignoreRef.current) return;
          setSchedules((data.schedules ?? []).filter((s: ScheduleOption) => s.isActive));
          setSchedulesLoading(false);
        })
        .catch(() => {
          if (ignoreRef.current) return;
          setSchedules([]);
          setSchedulesLoading(false);
        });
    }
  }, [form.programId]);

  const update = (patch: Partial<FormState>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const goNext = () => {
    setError(null);
    setForm((prev) => ({ ...prev, step: prev.step + 1 } as FormState));
  };
  const goPrev = () => {
    setError(null);
    setForm((prev) => ({ ...prev, step: prev.step - 1 } as FormState));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = registrationSchema.safeParse(form);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      setError(first.message ?? "Mohon periksa kembali isian formulir.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programId: form.programId,
          scheduleId: form.scheduleId || undefined,
          learningMethod: form.learningMethod,
          fullName: form.fullName,
          phone: form.phone,
          email: form.email || undefined,
          birthDate: form.birthDate || undefined,
          educationLevel: form.educationLevel,
          schoolName: form.schoolName || undefined,
          guardianName: form.guardianName || undefined,
          guardianPhone: form.guardianPhone || undefined,
          consent: form.consent,
        }),
      });

      const data = await res.json();

      if (res.status === 409) {
        // Duplicate registration detected — continue to existing record
        setSubmitted({ code: data.registrationCode, name: form.fullName, program: "" });
        router.replace(`/registration/success?code=${encodeURIComponent(data.registrationCode)}`);
        return;
      }

      if (!res.ok) {
        setError(data.error ?? "Terjadi kesalahan saat mendaftar. Coba lagi.");
        setSubmitting(false);
        return;
      }

      setSubmitted({ code: data.registrationCode, name: form.fullName, program: "" });
      router.push(`/registration/success?code=${encodeURIComponent(data.registrationCode)}`);
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi nanti.");
      setSubmitting(false);
    }
  }, [form, router]);

  const requiredMarker = <span className="text-brand-orange font-bold">*</span>;

  const isSchoolLevel = form.educationLevel === "SD" || form.educationLevel === "SMP";

  if (form.step === 4 && submitted) {
    return (
      <Card className="max-w-2xl mx-auto py-24 text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-green-100 text-green-700 w-16 h-16 mb-6">
          <CheckCircle className="size-10" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-slate-900 mb-2">
          Pendaftaran Berhasil
        </h2>
        <p className="text-slate-600 mb-8">
          Terima kasih, <span className="font-semibold">{submitted.name}</span>. Pendaftaran Anda telah kami terima.
        </p>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 mb-8 text-left">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Nomor Registrasi</p>
          <p className="font-heading font-mono font-bold text-brand-navy text-lg">{submitted.code}</p>
        </div>
        <p className="text-slate-600 mb-6">
          Simpan nomor registrasi ini. Admin akan menghubungi Anda melalui
          WhatsApp untuk konfirmasi langkah selanjutnya.
        </p>
        <Button variant="primary" className="w-full md:w-auto">
          <a href="/" className="w-full text-center sm:w-auto block">
            Kembali ke Beranda
          </a>
        </Button>
      </Card>
    );
  }

  return (
    <section className="py-8">
      <div className="mx-auto max-w-2xl">
        <Card className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            {stepperItems.map((item) => (
              <div key={item.number} className="flex flex-col items-center gap-1 relative">
                {item.number > 1 && (
                  <span className="absolute -left-3 top-2 h-4 w-px bg-slate-300" />
                )}
                <div
                  className={cn(
                    "rounded-full flex items-center justify-center size-8 border font-body font-semibold text-sm transition-colors",
                    form.step >= item.number
                      ? "bg-brand-navy text-white border-brand-navy"
                      : "bg-white text-slate-500 border-slate-200",
                  )}
                >
                  {item.number}
                </div>
                <span className={cn("text-xs font-medium", form.step >= item.number ? "text-brand-navy" : "text-slate-500")}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <h1 className="font-heading font-bold text-2xl text-slate-900 mb-8">
            Formulir Pendaftaran Online
          </h1>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* STEP 1: Pilih Program */}
            <div
              className={cn("space-y-5", form.step !== 1 && "hidden")}
            >
              <h2 className="font-heading font-bold text-xl text-slate-900 mb-2">
                {requiredMarker} Pilih Program Kursus
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                Pilih program yang ingin diikuti. Harga dan ketersediaan
                jadwal akan dikonfirmasi oleh admin setelah pendaftaran.
              </p>

              <div className="space-y-3">
                {programs.map((p) => (
                  <label key={p.id} className="block cursor-pointer">
                    <button
                      type="button"
                      onClick={() => {
                        update({ programId: p.id, scheduleId: null, learningMethod: "" });
                      }}
                      disabled={submitting}
                      className={cn(
                        "w-full rounded-xl border p-4 text-left transition-colors hover:bg-slate-50 disabled:opacity-60",
                        form.programId === p.id
                          ? "bg-amber-50 border-brand-orange"
                          : "border-slate-200 text-slate-700 hover:border-brand-orange/50",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <ImagePlaceholderInline category={p.category.toLowerCase().includes("bahasa") ? "bahasa" : p.category.toLowerCase().includes("multimedia") || p.category.toLowerCase().includes("digital") ? "digital" : "profesional"} />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{p.name}</p>
                          <p className="text-xs text-slate-500">{p.category}</p>
                        </div>
                        <span className="ml-auto text-xs font-medium text-slate-400">
                          Hubungi Admin untuk Harga
                        </span>
                      </div>
                      {form.programId === p.id && (
                        <span className="absolute right-3 top-3 text-brand-orange font-bold">
                          Terpilih
                        </span>
                      )}
                    </button>
                  </label>
                ))}
              </div>

              {form.programId && schedules.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="font-semibold text-slate-900">{requiredMarker} Pilih Jadwal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {schedules.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() =>
                          update({
                            scheduleId: s.id,
                            learningMethod: s.learningMethod,
                          })
                        }
                        disabled={submitting}
                        className={cn(
                          "rounded-xl border p-3 text-left transition-colors",
                          form.scheduleId === s.id
                            ? "bg-amber-50 border-brand-orange text-slate-900"
                            : "border-slate-200 text-slate-700 hover:border-brand-orange/50 hover:bg-amber-50",
                        )}
                      >
                        <div className="text-sm font-medium text-slate-900">
                          {s.day}, {formatTime(s.startTime)} - {formatTime(s.endTime)}
                        </div>
                        <div className="text-xs text-slate-500">
                          {s.learningMethod} &middot; Kuota {s.capacity}
                        </div>
                      </button>
                    ))}
                  </div>
                  {schedules.some((s) => !s.isActive) && (
                    <p className="text-xs text-amber-600 bg-amber-50 rounded-lg p-2">
                      Beberapa jadwal tidak tersedia saat ini.
                    </p>
                  )}
                </div>
              )}

              {form.programId && schedules.length === 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <p className="text-sm text-slate-600">
                    Belum ada jadwal yang tersedia untuk program ini.
                    Pendaftaran tetap dapat dilakukan dan jadwal akan
                    dikonfirmasi oleh admin.
                  </p>
                </div>
              )}

              <div className="mt-6 space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  {requiredMarker} Metode Belajar
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {["Tatap muka", "Online", "Gabungan"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => update({ learningMethod: method })}
                      disabled={submitting}
                      className={cn(
                        "rounded-xl border p-3 text-center transition-colors",
                        form.learningMethod === method
                          ? "bg-amber-50 border-brand-orange text-slate-900 font-semibold"
                          : "border-slate-200 text-slate-600 hover:border-brand-orange/50",
                      )}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* STEP 2: Informasi Peserta */}
            <div
              className={cn("space-y-5", form.step !== 2 && "hidden")}
            >
              <h2 className="font-heading font-bold text-xl text-slate-900 mb-2">
                {requiredMarker} Informasi Peserta
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                Isi data lengkap sesuai KTP / akta kelahiran peserta.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-1 text-sm font-medium text-slate-700">
                    Nama Lengkap {requiredMarker}
                  </label>
                  <input
                    id="fullName"
                    value={form.fullName}
                    onChange={(e) => update({ fullName: e.target.value })}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-1 text-sm font-medium text-slate-700">
                    Nomor WhatsApp {requiredMarker}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update({ phone: e.target.value.replace(/\s/g, "") })}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update({ email: e.target.value })}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition-colors"
                  placeholder="contoh@email.com"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-slate-700">
                  Tanggal Lahir
                </label>
                <input
                  id="birthDate"
                  type="date"
                  value={form.birthDate}
                  onChange={(e) => update({ birthDate: e.target.value })}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-slate-700">
                  Tingkat Pendidikan {requiredMarker}
                </label>
                <select
                  value={form.educationLevel}
                  onChange={(e) => update({ educationLevel: e.target.value })}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition-colors"
                >
                  {EducationLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl === "Mahasiswa" ? "Mahasiswa" : lvl === "Umum" ? "Masyarakat Umum" : lvl === "Profesional" ? "Profesional" : lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-slate-700">
                  Sekolah / Perguruan Tinggi
                </label>
                <input
                  id="schoolName"
                  value={form.schoolName}
                  onChange={(e) => update({ schoolName: e.target.value })}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition-colors"
                  placeholder="Contoh: SMP Negeri 1 Padang"
                />
              </div>

              {isSchoolLevel && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="font-semibold text-slate-900">
                    {requiredMarker} Informasi Wali Ortu
                  </h3>
                  <p className="text-sm text-slate-600">
                    Untuk peserta SD dan SMP, kami butuh data wali ortu untuk
                    koordinasi pelaksanaan pembelajaran.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-1 text-sm font-medium text-slate-700">
                        Nama Wali Ortu {requiredMarker}
                      </label>
                      <input
                        id="guardianName"
                        value={form.guardianName}
                        onChange={(e) => update({ guardianName: e.target.value })}
                        className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-1 text-sm font-medium text-slate-700">
                        Nomor WhatsApp Wali {requiredMarker}
                      </label>
                      <input
                        id="guardianPhone"
                        type="tel"
                        value={form.guardianPhone}
                        onChange={(e) => update({ guardianPhone: e.target.value.replace(/\s/g, "") })}
                        className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update({ consent: e.target.checked })}
                  className="rounded border-slate-300 text-brand-orange focus:ring-brand-orange bg-slate-50"
                />
                <label className="text-sm text-slate-600 leading-relaxed" htmlFor="consent">
                  Saya menyetujui pengolahan data pribadi untuk kebutuhan
                  pendaftaran ini dan memberikan izin kepada Hem's Institute
                  untuk menghubungi saya melalui WhatsApp.
                </label>
              </div>
            </div>

            {/* STEP 3: Tinjauan */}
            <div
              className={cn("space-y-5", form.step !== 3 && "hidden")}
            >
              <h2 className="font-heading font-bold text-xl text-slate-900 mb-2">
                {requiredMarker} Tinjauan Pendaftaran
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                Periksa kembali data Anda sebelum mengirimkan pendaftaran.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-xl border border-slate-200 bg-slate-50">
                <div className="col-span-2 space-y-2">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Nama Lengkap</p>
                  <p className="text-slate-900 font-medium">{form.fullName}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Nomor WhatsApp</p>
                  <p className="text-slate-900 font-medium">{form.phone}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</p>
                  <p className="text-slate-900 font-medium">{form.email || "-"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Tingkat Pendidikan</p>
                  <p className="text-slate-900 font-medium">{form.educationLevel}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Program</p>
                  <p className="text-slate-900 font-medium">
                    {programs.find((p) => p.id === form.programId)?.name ?? "-"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Jadwal</p>
                  <p className="text-slate-900 font-medium">
                    {schedules.find((s) => s.id === form.scheduleId)?.day ?? "-"}{" "}
                    {schedules.find((s) => s.id === form.scheduleId)?.startTime ? "-" : "-"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Metode Belajar</p>
                  <p className="text-slate-900 font-medium">{form.learningMethod}</p>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3">
                <AlertCircle className="size-5 mt-0.5 text-amber-600 shrink-0" />
                <p className="text-sm text-slate-600 leading-relaxed">
                  Data yang Anda kirim akan diverifikasi oleh admin. Nomor
                  registrasi akan dibuat setelah pendaftaran diterima sistem.
                </p>
              </div>
            </div>

            {/* STEP 4: Kirim */}
            <div
              className={cn("space-y-5", form.step !== 4 && "hidden")}
            >
              <h2 className="font-heading font-bold text-xl text-slate-900 mb-2">
                Kirim Pendaftaran
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                Klik tombol di bawah untuk mengirimkan pendaftaran Anda. Data
                akan disimpan secara aman dan nomor registrasi akan dibuat
                secara otomatis.
              </p>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="size-5 mt-0.5 text-green-600 shrink-0" />
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Setelah dikirim, Anda akan dialihkan ke halaman
                    konfirmasi yang berisi nomor registrasi dan tombol
                    WhatsApp untuk menghubungi admin.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goPrev}
                  disabled={submitting}
                  className="w-full sm:w-auto"
                >
                  Kembali
                </Button>
                <Button
                  type="submit"
                  disabled={submitting || !form.programId || !form.learningMethod}
                  className="w-full sm:w-auto"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 mr-2 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      Kirim Pendaftaran <ArrowRight className="size-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>

              {!form.programId && (
                <p className="mt-4 text-xs text-amber-600 bg-amber-50 rounded-lg p-3">
                  Silakan pilih program terlebih dahulu pada langkah 1.
                </p>
              )}
            </div>

            <div className="flex justify-between pt-8 border-t border-slate-100">
              {form.step > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={goPrev}
                  className="text-sm"
                >
                  Sebelumnya
                </Button>
              )}
              {form.step < 4 && (
                <Button
                  type="button"
                  onClick={goNext}
                  disabled={
                    form.step === 1 &&
                    (!form.programId || !form.learningMethod)
                  }
                  className="text-sm"
                >
                  Selanjutnya <ArrowRight className="size-4 ml-1" />
                </Button>
              )}
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-5 mt-0.5 text-amber-600 shrink-0" />
                  <p className="text-sm text-amber-800">{error}</p>
                </div>
              </div>
            )}
          </form>
        </Card>
      </div>
    </section>
  );
}

function formatTime(timeStr: string) {
  if (!timeStr) return "-";
  const [h, m] = timeStr.split(":");
  return `${h.padStart(2, "0")}:${m}`;
}

function ImagePlaceholderInline({ category }: { category: string }) {
  return (
    <div className="relative aspect-video rounded-xl border flex flex-col items-center justify-center overflow-hidden" style={{ width: 72, height: 48 }}>
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-current" viewBox="0 0 24 24">
        <path d="M9 17v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M20 13v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2z" />
        <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
