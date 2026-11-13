import { z } from "zod";

export const EducationLevels = ["SD", "SMP", "SMA", "Mahasiswa", "Umum", "Profesional"] as const;

export const registrationSchema = z
  .object({
    programId: z.string().uuid("Program tidak valid."),
    scheduleId: z.string().uuid().optional().nullable(),
    learningMethod: z.string().min(1, "Metode belajar harus dipilih."),
    fullName: z.string().min(2, "Nama lengkap minimal 2 karakter."),
    phone: z
      .string()
      .min(10, "Nomor WhatsApp terlalu pendek.")
      .max(20, "Nomor WhatsApp terlalu panjang."),
    email: z.string().email("Format email tidak valid.").optional().or(z.literal("")),
    birthDate: z.string().optional().or(z.literal("")),
    educationLevel: z.enum(EducationLevels, {
      error: "Tingkat pendidikan harus dipilih.",
    }),
    schoolName: z.string().optional().or(z.literal("")),
    guardianName: z.string().optional().or(z.literal("")),
    guardianPhone: z.string().optional().or(z.literal("")),
    consent: z
      .boolean()
      .refine((v) => v === true, {
        message: "Persetujuan pendaftaran harus dicentang.",
      }),
  })
  .refine(
    (data) => {
      const isSchoolLevel = data.educationLevel === "SD" || data.educationLevel === "SMP";
      if (isSchoolLevel && !data.guardianName) {
        return false;
      }
      return true;
    },
    {
      message: "Nama wali ortu harus diisi untuk siswa SD dan SMP.",
      path: ["guardianName"],
    },
  )
  .refine(
    (data) => {
      const isSchoolLevel = data.educationLevel === "SD" || data.educationLevel === "SMP";
      if (isSchoolLevel && !data.guardianPhone) {
        return false;
      }
      return true;
    },
    {
      message: "Nomor WhatsApp wali ortu harus diisi untuk siswa SD dan SMP.",
      path: ["guardianPhone"],
    },
  );

export type RegistrationInput = z.infer<typeof registrationSchema>;
