import TambahBarangModule from "@/modules/TambahBarangModule";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jualan | KaryaKita",
  description: "Mulau berjualan di KaryaKita Platform",
};

const page = () => {
  return <TambahBarangModule />;
};

export default page;
