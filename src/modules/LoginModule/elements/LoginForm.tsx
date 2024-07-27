import React from 'react';
import { z } from 'zod';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

  function onSubmit(data: FormValues) {
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      const user = userCredential.user;
      toast.success('Halo ' + user.displayName)
      router.push("/dashboard")
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
        toast.error('User not found. Please sign up first.');
      } else {
        const errorMessage = error.message;
        toast.error(errorMessage);
      }
    });
  }

  return (
    <div>
      
    </div>
  )
}

export default LoginForm
