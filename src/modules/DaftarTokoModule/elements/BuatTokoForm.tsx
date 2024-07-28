"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import TaroKtp from "../components/TaroKtp";
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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof FormSchema>;

export const BuatTokoForm = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [user] = useAuth();
  const [data] = useData();

  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const storageRef = ref(storage, `ktp/${user?.uid}`);
    await uploadBytes(storageRef, uploadedImage!);
    const url = await getDownloadURL(storageRef);

    const userId = user?.uid ?? "";
    const userRef = doc(db, "user", userId);
    await updateDoc(userRef, {
      ktp: url,
      isPenjual: true,
      namaToko: data.namaToko,
      deskripsi: data.deskripsi,
      alamat: data.alamat === undefined ? "" : data.alamat,
    }).then(() => {
      toast.success("Toko berhasil dibuat");
      router.push("/dashboard")
      window.location.reload()
    })
  };

  return (
    <Form {...form}>
      <div className="flex items-center mt-10 justify-center">
        <div className=" rounded-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-primary mb-6 text-center">
            Daftar Sebagai Penjual
          </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="namaToko"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-[16px] font-medium text-primary">
                    Nama Toko
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Masukkan nama toko"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deskripsi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-[16px] font-medium text-primary">
                    Deskripsi Toko
                  </FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Masukkan deskripsi toko"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      rows={4}
                      {...field}
                    ></textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-[16px] font-medium text-primary">
                    Alamat <span className="text-gray-500">(opsional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Masukkan alamat toko"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mb-6">
              <label
                htmlFor="fotoKTP"
                className="block mb-5 text-sm font-medium text-primary"
              >
                Masukkan Fotomu Sambil Memegang KTP
              </label>
              <TaroKtp />
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800"
            >
              Submit
            </Button>
            <FormField
                control={form.control}
                name="KTP"
                render={({ field }) => (
                  <FormItem>
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
                       className="-translate-y-80 opacity-0 mt-1 h-[200px] block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </form>
        </div>
      </div>
    </Form>
  );
};
