import React from "react";
import LoginForm from "../elements/LoginForm";
import Image from "next/image";

const LoginSection = () => {
  return (
    <div className="flex flex-row min-h-screen">
      <div className="w-1/2 flex flex-col pb-12 gap-[48px] items-center justify-center bg-white">
        <Image src="/KaryaKitaLogo.png" alt="logo" width={380} height={380} />
        <p className="w-[400px] text-center text-primary">
          Platform khusus bagi seniman dan pengrajin untuk memamerkan karya,
          bertemu berbagai peluang, berkembang dan bertransaksi
        </p>
      </div>
      <div className="w-[73px] bg-[#382784]" />
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-r to-primary from-[#251a56]">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginSection;
