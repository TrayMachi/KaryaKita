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
import {
  createUserWithEmailAndPassword,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth, storage, db } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { TransitionLink } from "@/components/utils/TransitionLink";
import { useData, useAuth } from "@/components/contexts/context";

type FormValues = z.infer<typeof FormSchema>;

export const EditForm: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [user] = useAuth();
  const [data] = useData();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: user?.displayName ?? "",
      noTelp: data?.noTelp ?? "",
      password: "",
      confirmPassoword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (uploadedImage !== null) {
      const storageRef = ref(storage, `profile/${user?.uid}`);
      await uploadBytes(storageRef, uploadedImage!);
      const url = await getDownloadURL(storageRef);
      await updateProfile(auth.currentUser!, {
        photoURL: url,
        displayName: data.username,
      });
    }
    if (data.password !== "" && data.password !== undefined) {
      const user = auth.currentUser!;
      updatePassword(user, data.password)
        .then(() => {
          toast.success("Password berhasil diubah");
        })
        .catch((error) => {
          toast.error("Gagal mengubah password");
        });
    }
    const userId = user?.uid ?? "";
    const userRef = doc(db, "user", userId);
    await updateDoc(userRef, {
      namaUser: data.username,
      noTelp: data.noTelp,
    }).then(() => {
      toast.success("Berhasil mengubah data");
    });
  };
  if (user) {
    return (
      <Form {...form}>
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-poppins mt-5 text-[40px] text-primary font-extrabold">
            Edit Profil
          </h2>
          <p className="md:text-[16px] text-[12px] text-center font-normal text-muted">
            Silahkan mengubah data diri anda (semua opsional).
          </p>
          <form
            className="flex flex-col justify-center items-center md:gap-8 gap-6 z-10 w-full h-full p-8 pt-3 rounded-xl"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="profilePic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px] text-primary">
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
                        className="xl:w-[600px] lg:w-[350px] w-[270px] h-[40px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px] text-primary">
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
                name="noTelp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px] text-primary">
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px] text-primary">
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
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassoword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px] text-primary">
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
              Ubah
            </Button>
          </form>
        </div>
      </Form>
    );
  }
};
