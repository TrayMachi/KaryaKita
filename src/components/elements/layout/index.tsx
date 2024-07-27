import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <Toaster position="top-center" />
      <main className="w-full min-h-screen pt-[80px] bg-[#ECEFF7] dark:bg-[#00090A]">
        {children}
      </main>
      <Footer />
    </main>
  );
};
