"use client";
import React from "react";
import { useData, useAuth } from "@/components/contexts/context";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Calendar } from "lucide-react";

export const ProfileData = () => {
  const [user] = useAuth();
  const [data] = useData();
  if (user) {
    return (
      <div className="flex flex-col justify-center gap-4">
        <div className="flex flex-col justify-center items-center">
          <Avatar className="w-[200px] h-[200px] my-2">
            <AvatarImage src={user.photoURL === null ? "" : user.photoURL} />
          </Avatar>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-primary">
            {user.displayName}
          </h1>
          <h2 className="text-[16px] font-semibold text-muted">
            {data?.isPenjual ? "Artist" : "Penikmat Seni"}
          </h2>
        </div>
        <div className="bg-[#B5B3B3] flex flex-col h-[1px] w-[200px]" />
        <div className="flex flex-row gap-2 text-[16px] font-medium text-primary">
          <Mail />
          <p className="text-muted">{user.email}</p>
        </div>
        <div className="flex flex-row gap-2 text-[16px] font-medium text-primary">
          <Phone />
          <p className="text-muted">{data?.noTelp}</p>
        </div>
        <div className="flex flex-row gap-2 text-[16px] font-medium text-primary">
          <Calendar />
          <p className="text-muted">{data?.tanggalLahir}</p>
        </div>
      </div>
    );
  }
};
