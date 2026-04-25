"use client";

import { Reference } from "@/types/client-types";
import { createContext, useContext, useState } from "react";

const ReferenceContext = createContext<any>(null);

export function ReferenceProvider({ children }: { children: React.ReactNode }) {
  const [references, setReferences] = useState<Reference[]>([]);

  const addReference = (ref: Reference) => {
    setReferences((prev) => {
      if (prev.some((r) => r.id === ref.id)) return prev;
      return [...prev, ref];
    });
  };

  const removeReference = (id: string) => {
    setReferences((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <ReferenceContext.Provider
      value={{ references, addReference, removeReference }}
    >
      {children}
    </ReferenceContext.Provider>
  );
}

export const useReference = () => useContext(ReferenceContext);
