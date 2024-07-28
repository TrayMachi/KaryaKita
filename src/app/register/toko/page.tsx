import DaftarTokoModule from "@/modules/DaftarTokoModule";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Toko | KaryaKita",
  description: "Register your Toko to KaryaKita platform",
};

const page = () => {
  return <DaftarTokoModule />;
};

export default page;
