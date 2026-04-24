"use client";

import { DashboardWidget } from "@/interfaces/client-interface";
import { createContext, useContext, useState } from "react";

const DashboardContext = createContext<any>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);

  const addWidget = (widget: DashboardWidget) => {
    setWidgets((prev) => [...prev, widget]);
  };

  const removeWidget = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <DashboardContext.Provider value={{ widgets, setWidgets, addWidget, removeWidget }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);
