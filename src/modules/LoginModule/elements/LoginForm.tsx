"use client"
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
import Link from "next/link";
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
        router.push("/dashboard");
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
        <div className="w-[450px]">
          <h2 className="text-[40px] font-poppins text-white font-extrabold drop-shadow-glow">
            Masuk ke akun
          </h2>
          <p className="text-[16px] text-white pt-2 pb-14 font-poppins">Masukkan kredensial yang valid untuk mengakses seluruh fitur KaryaKita</p>
        </div>
        <form
          className="flex flex-col justify-center items-start md:gap-8 gap-6 z-10 w-full h-full rounded-xl"
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
          <Button
            type="submit"
            className="bg-purple-500 font-bold md:w-[400px] w-[270px] hover:bg-secondary"
          >
            Masuk
          </Button>
          <div className="flex flex-col text-white lg:text-xl md:text-md text-xs font-bold">
            <p>
              Belum punya akun?{" "}
              <span>
                <Link
                  className="text-secondary-foreground cursor-pointer hover:text-secondary"
                  href="/register"
                >
                  Daftar di sini
                </Link>{" "}
              </span>
            </p>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default LoginForm;
