import React from "react";
import { TransitionLink } from "@/components/utils/TransitionLink";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-[100px] py-[18px] px-20 bg-background">
      <TransitionLink href="/">
        <div className="relative w-[110px] h-[110px]">
          <Image
            alt="contoh"
            src={"/KaryaKitaLogoNoDesc.png"}
            fill
            sizes="none"
            className="object-contain"
          />
        </div>
      </TransitionLink>
      <div className="flex flex-row gap-[72px] items-center">
        <TransitionLink href="/" className="text-[16px] font-poppins font-semibold text-[#45349F]">Beranda</TransitionLink>
        <TransitionLink href="/login">
          <Button>Masuk</Button>
        </TransitionLink>
      </div>
    </nav>
  );
};
