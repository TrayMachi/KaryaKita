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

type FormValues = z.infer<typeof FormSchema>;

export const RegisterForm: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [ktm, setKtm] = useState<File | null>(null);
  const [jurusan, setJurusan] = useState<string[]>([] as string[]);

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
              });
              toast.success("Akun berhasil dibuat!");
              router.push("/login");
            })
            .catch((error) => {
              toast.error("Gagal membuat akun!");
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
      <div className="flex flex-col justify-center items-center mb-20">
        <h2 className="text-[50px] text-secondary-foreground font-extrabold drop-shadow-glow mb-10">
          Daftar Akun
        </h2>
        <form
          className="flex flex-col justify-center items-center md:gap-8 gap-6 z-10 w-full h-full bg-primary-foreground p-8 pt-16 rounded-xl"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 justify-start items-center xl:gap-8 md:gap-4 gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="lg:text-xl md:text-md text-xs font-bold text-secondary-foreground">
                    Nama Lengkap
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your Full Name"
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
                  <FormLabel className="lg:text-xl md:text-md text-xs font-bold text-secondary-foreground">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Emailmu di sini"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="lg:text-xl md:text-md text-xs font-bold text-secondary-foreground">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password..."
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
              name="noTelp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="lg:text-xl md:text-md text-xs font-bold text-secondary-foreground">
                    No. Telepon
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="No Telepon"
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
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"ghost"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) =>
                          date > new Date() || date < new Date("1900-01-01")
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
          <FormField
            control={form.control}
            name="confirmPassoword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="lg:text-xl md:text-md text-xs font-bold text-secondary-foreground">
                  Verifikasi Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your password..."
                    className="xl:w-[600px] lg:w-[350px] md:h-[50px] w-[270px] h-[40px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col text-white lg:text-xl md:text-md text-xs font-bold">
            <p>
              Sudah punya akun?{" "}
              <span>
                <Link
                  className="text-secondary-foreground cursor-pointer hover:text-[#e2a200]"
                  href="/login"
                >
                  Login disini
                </Link>{" "}
              </span>
            </p>
          </div>
          <Button
            type="submit"
            className="bg-secondary-foreground font-bold xl:w-[600px] lg:w-[350px] w-[270px] hover:bg-[#e2a200]"
          >
            Daftar
          </Button>
        </form>
      </div>
    </Form>
  );
};
