"use client";
import React, { useState, createContext, useContext } from "react";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

const AuthConttext = createContext<
  [User | null, React.Dispatch<React.SetStateAction<User | null>>] | undefined
>(undefined);
const DataContext = createContext<
  | [
      DocumentData | null,
      React.Dispatch<React.SetStateAction<DocumentData | null>>
    ]
  | undefined
>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<User | null>(null);
  const [data, setData] = useState<DocumentData | null>(null);

  return (
    <DataContext.Provider value={[data, setData]}>
      <AuthConttext.Provider value={[auth, setAuth]}>
        {children}
      </AuthConttext.Provider>
    </DataContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthConttext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
