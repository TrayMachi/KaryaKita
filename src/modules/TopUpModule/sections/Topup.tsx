"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useData, useAuth } from "@/components/contexts/context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

export const TopUp = () => {
  const [topUp, setTopUp] = useState<number>(0);
  const [user] = useAuth();
  const [data] = useData();

  const handleTopUp = async () => {
    const userId = user?.uid ?? "";
    const userRef = doc(db, "user", userId);
    await updateDoc(userRef, {
      koin: data?.koin + topUp,
    }).then(() => {
      toast.success("Top Up Berhasil!");
    });
  };
  if (user) {
    return (
      <div className="flex flex-col justify-center">
        <div className="flex flex-col gap-1 justify-center items-center">
          <h1 className="text-primary text-[40px] font-bold">
            Isi Ulang KaKi Koin
          </h1>
          <p className="text-[16px] text-muted">1 KaKi Koin = Rp 1.000,00</p>
        </div>
        <Label className="mt-6 text-primary">Nominal Top Up</Label>
        <Input
          onChange={(e) => setTopUp(Number(e.target.value))}
          placeholder="100 KoKi Koin"
          type="number"
          className="w-[400px] mt-2"
        />
        <Button
          onClick={handleTopUp}
          variant={"ghost"}
          className="mt-6 w-[400px]"
        >
          Bayar Dengan QRIS
        </Button>
        <div className="bg-[#B5B3B3] flex flex-col h-[1px] w-[400px] my-6" />
        <Button onClick={handleTopUp} className="w-[400px]">
          Bayar Dengan Crypto
        </Button>
      </div>
    );
  }
};
