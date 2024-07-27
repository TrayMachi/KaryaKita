"use client";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { FormSchema } from "../constant";
import uuid from "react-uuid";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { TransitionLink } from "@/components/utils/TransitionLink";

type FormValues = z.infer<typeof FormSchema>;

export const RegisterForm: React.FC = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: FormValues) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const newDate = format(new Date(data.tanggalLahir), "dd/MM/yyyy");
        if (user) {
          updateProfile(user, {
            displayName: data.username,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/karyakita-261a3.appspot.com/o/PHOTOS%2FUserFallback.png?alt=media&token=f943760c-5f48-4084-89f0-61016d3c5d23',
          })
            .then(async () => {
              const docRef = doc(db, "user", user.uid);
              await setDoc(docRef, {
                userId: user.uid,
                email: user.email,
                namaUser: data.username,
                noTelp: data.noTelp,
                isPenjual: false,
                tanggalLahir: newDate,
                koin: 0,
              });
              toast.success("Akun berhasil dibuat!");
              router.push("/login");
            })
            .catch((error) => {
              toast.error("Gagal membuat akun! \n error: " + error);
            });
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <Form {...form}>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h2 className="font-poppins mt-5 text-[40px] text-primary-foreground font-extrabold mb-10">
          Buat Akun
        </h2>
        <form
          className="flex flex-col justify-center items-center md:gap-8 gap-6 z-10 w-full h-full p-8 pt-3 rounded-xl"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] text-secondary-foreground">
                    Nama Lengkap
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      className="xl:w-[600px] lg:w-[350px] md:h-[50px] w-[270px] h-[40px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tanggalLahir"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-[16px] mt-2 text-primary-foreground font-poppins">
                    Tanggal Lahir
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="tertiary"
                          className={cn(
                            "xl:w-[600px] lg:w-[350px] w-[270px] md:h-[50px] h-[40px] pl-3 text-left font-normal flex flex-row items-center justify-between",
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
              name="noTelp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] text-secondary-foreground">
                    No. Telepon
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Masukkan nomor telepon"
                      className="xl:w-[600px] lg:w-[350px] md:h-[50px] w-[270px] h-[40px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] text-secondary-foreground">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Masukkan email"
                      className="xl:w-[600px] lg:w-[350px] w-[270px] md:h-[50px]  h-[40px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] text-secondary-foreground">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Masukkan password"
                      className="xl:w-[600px] lg:w-[350px] md:h-[50px] w-[270px] h-[40px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <ul className="text-primary-foreground list-disc px-4">
                    <li>Password berisikan minimal 8 karakter </li>
                    <li>Password wajib memiliki huruf kapital dan angka</li>
                  </ul>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassoword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] text-secondary-foreground">
                    Ulangi Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Masukkan ulang password"
                      className="xl:w-[600px] lg:w-[350px] md:h-[50px] w-[270px] h-[40px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="font-bold xl:w-[600px] lg:w-[350px] w-[270px]"
          >
            Daftar
          </Button>
          <div className="flex flex-col text-primary-foreground text-[16px] font-normal">
            <p>
              Sudah punya akun?{" "}
              <span>
                <TransitionLink
                  className="text-secondary cursor-pointer underline"
                  href="/login"
                >
                  Login disini
                </TransitionLink>{" "}
              </span>
            </p>
          </div>
        </form>
      </div>
    </Form>
  );
};
