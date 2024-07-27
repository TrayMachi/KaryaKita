import { RegisterModule } from "@/modules/RegisterModule";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | KaryaKita",
  description: "Register to KaryaKita platform",
};

const page = () => {
  return <RegisterModule />;
};

export default page;
