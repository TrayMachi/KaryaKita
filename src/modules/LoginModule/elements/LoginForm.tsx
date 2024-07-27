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
        <h2 className="text-[50px] text-secondary-foreground font-extrabold drop-shadow-glow">
          Masuk
        </h2>
        <form
          className="flex flex-col justify-center items-start md:gap-8 gap-6 z-10 w-full h-full bg-primary-foreground p-8 rounded-xl"
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
                    className="md:w-[600px] md:h-[50px] w-[270px] h-[40px]"
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
                    className="md:w-[600px] md:h-[50px] w-[270px] h-[40px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col text-white lg:text-xl md:text-md text-xs font-bold">
            <p>
              Belum punya akun?{" "}
              <span>
                <Link
                  className="text-secondary-foreground cursor-pointer hover:text-[#e2a200]"
                  href="/register"
                >
                  Daftar disini
                </Link>{" "}
              </span>
            </p>
          </div>
          <Button
            type="submit"
            className="bg-secondary-foreground font-bold md:w-[600px] w-[270px] hover:bg-[#e2a200]"
          >
            Masuk
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default LoginForm;
