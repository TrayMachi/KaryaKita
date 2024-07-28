"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useData, useAuth } from "@/components/contexts/context";
import { FormSchema } from "../constant";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { auth, storage, db } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CalendarIcon, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, set } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import uuid from "react-uuid";

type FormValues = z.infer<typeof FormSchema>;

export const TambahBarangForm: React.FC = () => {
  const [category, setCategory] = useState<string>("Jasa");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [user] = useAuth();
  const [data] = useData();

  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      variantBarang: [{ nama: "", harga: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variantBarang",
  });

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const onSubmit = async (data: FormValues) => {
    const id = uuid();
    const storageRef = ref(storage, `barang/${id}`);
    await uploadBytes(storageRef, uploadedImage!);
    const url = await getDownloadURL(storageRef);

    const userId = user?.uid ?? "";
    const userRef = doc(db, "karya", id);
    await setDoc(userRef, {
      barang: [
        ...data.variantBarang.map((variant) => ({
          nama: variant.nama,
          harga: variant.harga,
        })),
      ],
      author: userId,
      fotoBarang: url,
      namaBarang: data.namaBarang,
      detailBarang: data.detailBarang,
      onGoing: [],
      orderFinished: [],
      category: category,
      isBidding : (data.biddingMulai  === undefined || data.biddingBerakhir === undefined) ? false : true,
      biddingMulai: data.biddingMulai === undefined ? null : data.biddingMulai,
      biddingBerakhir: data.biddingBerakhir === undefined ? null : data.biddingBerakhir,
    }).then(() => {
      toast.success("Barang berhasil ditambahkan");
      router.push("/");
    });
  };

  return (
    <Form {...form}>
      <div className="max-w-xl text-primary mx-auto  p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Tambah Barang</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="namaBarang"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-[16px] mb-2 font-bold">
                  Nama Acara
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nama karya anda"
                    className="w-full p-2 mb-4 border rounded"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fotoBarang"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-[16px] mb-2 font-bold">
                  Foto Profile
                </FormLabel>
                <FormControl>
                  <Input
                    ref={field.ref}
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onBlur={field.onBlur}
                    name={field.name}
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      setUploadedImage(e.target.files?.[0] || null);
                    }}
                    className="w-full p-2 mb-4 border rounded"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h3 className="block mb-2 text-[16px] font-bold">
            Variant Barang dan Harga (1 KaKiKoin = Rp 1000)
          </h3>
          {fields.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div key={item.id} className="flex flex-row">
                <FormField
                  control={form.control}
                  name={`variantBarang.${index}.nama`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="Nama variant"
                          className="w-full px-6 bg-background border active:ring-0 rounded-none rounded-l-lg font-normal md:h-[50px] h-[40px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variantBarang.${index}.harga`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center">
                          <Input
                            type="number"
                            placeholder="Harga (1 KaKiKoin = Rp 1000)"
                            className={`w-full focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none md:h-[50px] h-[40px]
                                  ${
                                    index === fields.length - 1
                                      ? ""
                                      : "max-lg:rounded-bl-lg"
                                  }`}
                            {...field}
                          />
                          <Button
                            type="button"
                            disabled={index === 0}
                            className={`bg-destructive font-bold md:h-[50px] h-[40px] rounded-none rounded-r-lg`}
                            onClick={() => remove(index)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      {index !== fields.length - 1 && <FormMessage />}
                    </FormItem>
                  )}
                />
              </div>
              {index === fields.length - 1 && (
                <Button
                  type="button"
                  variant={"ghost"}
                  className="font-bold w-[270px] transition-all"
                  onClick={() => append({ nama: "", harga: "" })}
                >
                  Tambah Variant
                </Button>
              )}
            </div>
          ))}

          <div className="flex justify-between mb-4">
            <button
              type="button"
              className={`flex-1 p-2 mr-2 rounded ${
                category === "Jasa" ? "bg-primary text-white" : "bg-gray-200"
              }`}
              onClick={() => handleCategoryChange("Jasa")}
            >
              Jasa
            </button>
            <button
              type="button"
              className={`flex-1 p-2 rounded ${
                category === "Produk" ? "bg-primary text-white" : "bg-gray-200"
              }`}
              onClick={() => handleCategoryChange("Produk")}
            >
              Produk
            </button>
          </div>
          <FormField
            control={form.control}
            name="detailBarang"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-[16px] mb-2 font-bold">
                  Detail Karya
                </FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Masukkan detail barang"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    rows={4}
                    {...field}
                  ></textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-center items-center gap-4">
            <h3 className="block mb-2 text-[16px] font-bold">
              Masukkan Foto Barang (minimal 1 foto)
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="block mb-2 text-[16px] font-bold">
              Bidding Mulai - Bidding Berakhir (Opsional)
            </h3>
            <div className="flex flex-row gap-2 justify-evenly items-center">
              <FormField
                control={form.control}
                name="biddingMulai"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="tertiary"
                            className={cn(
                              "w-[200px] pl-3 text-left font-normal flex flex-row items-center justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field?.value ? (
                              <span className="text-muted-foreground">
                                {format(field?.value, "PPP")}
                              </span>
                            ) : (
                              <span>Pilih tanggal</span>
                            )}
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        align={"start"}
                        className="bg-transparent border-0"
                      >
                        <Calendar
                          captionLayout="dropdown-buttons"
                          mode="single"
                          fromYear={1990}
                          toYear={2024}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date >= new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="biddingBerakhir"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="tertiary"
                            className={cn(
                              "w-[200px] pl-3 text-left font-normal flex flex-row items-center justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field?.value ? (
                              <span className="text-muted-foreground">
                                {format(field?.value, "PPP")}
                              </span>
                            ) : (
                              <span>Pilih tanggal</span>
                            )}
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        align={"start"}
                        className="bg-transparent border-0"
                      >
                        <Calendar
                          captionLayout="dropdown-buttons"
                          mode="single"
                          fromYear={1990}
                          toYear={2024}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date >= new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button className="w-full" type="submit">
            Jual
          </Button>
        </form>
      </div>
    </Form>
  );
};
