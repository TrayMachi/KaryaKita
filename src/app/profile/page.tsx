import { ProfileGeneralModule } from "@/modules/ProfileGeneralModule";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | KaryaKita",
  description: "Your beautiful profile",
};

const page = () => {
  return <ProfileGeneralModule />;
};

export default page;
