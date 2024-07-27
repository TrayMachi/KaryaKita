import { LoginModule } from "@/modules";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | KaryaKita",
  description: "Login to KaryaKita platform",
};

const page = () => {
  return <LoginModule />;
};

export default page;
