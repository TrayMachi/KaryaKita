import DashboardPenjualModule from "@/modules/DashboarPenjualModule";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | KaryaKita",
  description: "Dashboard KaryaKita Platform",
};

const page = () => {
  return <DashboardPenjualModule />;
};

export default page;
