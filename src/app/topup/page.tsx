import { TopUpModule } from "@/modules/TopUpModule";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top-Up | KaryaKita",
  description: "Top-up your balance",
};

const page = () => {
  return <TopUpModule />;
};

export default page;
