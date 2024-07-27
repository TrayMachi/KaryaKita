import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const FormSchema = z
  .object({
    profilePic: z
      .any()
      .refine((files) => {
        return files?.[0]?.size <= MAX_FILE_SIZE;
      }, `Max image size is 5MB.`)
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      )
      .optional()
      .default(null),
    username: z.string({
      required_error: "Tolong masukan nama lengkap anda.",
    }).optional(),
    password: z
      .string({
        required_error: "Tolong masukan password anda.",
      })
      .optional(),
    noTelp: z
      .string({
        required_error: "Tolong masukan nomor telepon anda.",
      })
      .optional(),
    confirmPassoword: z
      .string({
        required_error: "Tolong konfirmasi password anda.",
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassoword, {
    message: "Password tidak sama",
    path: ["passwordVerification"],
  });
