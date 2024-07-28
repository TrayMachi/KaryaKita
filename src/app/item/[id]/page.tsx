import React from "react";
import type { Metadata } from "next";
import ItemDetailModule from "@/modules/ItemDetailModule";
import { NextPage } from "next";

export const metadata: Metadata = {
  title: "Detail | KaryaKita",
};

const page: NextPage<{
  params: {
    id: string;
  };
}> = async ({ params }) => {
  return <ItemDetailModule item={params.id} />;
};

export default page;
