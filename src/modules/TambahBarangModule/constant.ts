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
    fotoBarang: z
      .any()
      .refine((files) => {
        return files?.[0]?.size <= MAX_FILE_SIZE;
      }, `Max image size is 5MB.`)
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      )
      .default(null),
    namaBarang: z
      .string({
        required_error: "Tolong masukan nama barang anda.",
      })
      .max(30, "Nama maksimal 24 karakter."),
    detailBarang: z
      .string({
        required_error: "Tolong masukan deskripsi anda.",
      })
      .max(200, "Deskripsi maksimal 200 karakter."),
    biddingMulai: z.date().optional(),
    biddingBerakhir: z.date().optional(),
    variantBarang: z.array(
      z.object(
        {
          nama: z.string().min(1, "Nama variant tidak boleh kosong."),
          harga: z.string().min(1, "Harga variant tidak boleh kosong."),
        },
        { required_error: "Tolong masukan nama dan harga variant." }
      )
    ),
  })
