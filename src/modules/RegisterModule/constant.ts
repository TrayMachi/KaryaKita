import { z } from "zod";

export const FormSchema = z
  .object({
    username: z.string({
      required_error: "Tolong masukan nama lengkap anda.",
    }).max(24, "Nama maksimal 16 karakter."),
    email: z.string({
      required_error: "Tolong masukan email anda.",
    }),
    password: z
      .string({
        required_error: "Tolong masukan password anda.",
      })
      .min(8, "Password minimal 8 karakter."),
    tanggalLahir: z.date({
      required_error: "Tolong masukan tanggal lahir anda.",
    }),
    noTelp: z.string({
      required_error: "Tolong masukan nomor telepon anda.",
    }).min(11).max(13),
    confirmPassoword: z
      .string({
        required_error: "Tolong konfirmasi password anda.",
      })
      .min(8),
  })
  .refine((data) => data.password === data.confirmPassoword, {
    message: "Password tidak sama",
    path: ["passwordVerification"],
  });