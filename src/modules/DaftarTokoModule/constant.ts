import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const FormSchema = z.object({
  KTP: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, ``)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ""
    ),
  namaToko: z
    .string({
      required_error: "Tolong masukan nama toko anda.",
    })
    .max(24, "Nama maksimal 24 karakter."),
  deskripsi: z
    .string({
      required_error: "Tolong masukan deskripsi anda.",
    })
    .max(400, "Deskripsi maksimal 400 karakter."),
  alamat: z.string({
    required_error: "Tolong masukan password anda.",
  }).optional(),
});
