"use client";
import React from "react";
import { z } from "zod";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "firebase/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TransitionLink } from "@/components/utils/TransitionLink";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  email: z.string({
    required_error: "Tolong masukan email anda.",
  }),
  password: z.string({
    required_error: "Tolong masukan password anda.",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: FormValues) {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user: User = userCredential.user;
        toast.success("Login Berhasil", {
          description: `Selamat datang ${user.displayName}`,
        });
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credential") {
          toast.error("User not found. Please sign up first.");
        } else {
          const errorMessage = error.message;
          toast.error(errorMessage);
        }
      });
  }

  return (
    <Form {...form}>
      <div className="flex flex-col justify-center items-center">
        <div className="w-[400px] text-balance items-start gap-6 flex flex-col">
          <h2 className="text-[40px] leading-[48px] font-poppins text-white font-extrabold">
            Masuk ke akun
          </h2>
          <p className="text-[16px] text-white pb-[32px] font-poppins">
            Masukkan kredensial yang valid untuk mengakses seluruh fitur
            KaryaKita
          </p>
        </div>
        <form
          className="flex flex-col justify-center items-center md:gap-8 gap-6 z-10 w-full h-full rounded-xl"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
                    className="md:w-[400px] md:h-[50px] w-[400px] h-[40px]"
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
                    className="md:w-[400px] md:h-[50px] w-[400px] h-[40px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="font-bold md:w-[400px] w-[270px] ">
            Masuk
          </Button>
          <div className="flex flex-col justify-center items-center text-primary-foreground text-[16px] font-normal">
            <p>
              Tidak Memiliki Akun?{" "}
              <span>
                <TransitionLink
                  className="text-secondary cursor-pointer underline"
                  href="/register"
                >
                  Buat Akun
                </TransitionLink>{" "}
              </span>
            </p>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default LoginForm;
