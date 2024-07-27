import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { DataProvider } from "@/components/contexts/context";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <Toaster position="top-center" />
      <DataProvider>
        <Navbar />
        <main className="w-full min-h-screen font-poppins bg-[#fafafa] dark:bg-[#00090A]">
          {children}
        </main>
        <Footer />
      </DataProvider>
    </Suspense>
  );
};
