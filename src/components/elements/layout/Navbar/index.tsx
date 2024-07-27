"use client";
import React, { useEffect } from "react";
import { TransitionLink } from "@/components/utils/TransitionLink";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { doc, getDoc } from "firebase/firestore";
import { useAuth, useData } from "@/components/contexts/context";
import { useRouter, usePathname } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { toast } from "sonner";

export const Navbar = () => {
  const [user, setUser] = useAuth();
  const [data, setData] = useData();

  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = auth.currentUser?.uid ? auth.currentUser?.uid : "";
        const docRef = doc(db, "user", userId);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              //if (
              //  pathname === "/login" ||
              //  pathname === "/register" ||
              //  pathname === "/dashboard/admin"
              //) {
              //  router.push("/dashboard");
              //}
              setUser(user);
              setData(docSnap.data());
            } 
          })
          .catch((error) => {
            console.error("Error getting document:", error);
          });
      } else {
        setUser(null);
        //if (pathname === "/dashboard" || pathname === "/dashboard/admin") {
        //  router.push("/login");
        //}
      }
    });
  };

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        toast.success("Logout Successful", {
          description: "You have been logged out",
        });
        window.location.reload();
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <nav className="flex justify-between items-center h-[100px] py-[18px] px-20 bg-background">
      <TransitionLink href="/">
        <div className="relative w-[110px] h-[110px]">
          <Image
            alt="contoh"
            src={"/KaryaKitaLogoNoDesc.png"}
            fill
            sizes="none"
            className="object-contain"
          />
        </div>
      </TransitionLink>
      <div className="flex flex-row gap-[72px] items-center">
        <TransitionLink
          href="/"
          className="text-[16px] font-poppins font-semibold text-[#45349F]"
        >
          Beranda
        </TransitionLink>
        <TransitionLink href="/login">
          <Button className="w-[118px] text-[16px] font-poppins">Masuk</Button>
        </TransitionLink>
      </div>
    </nav>
  );
};
