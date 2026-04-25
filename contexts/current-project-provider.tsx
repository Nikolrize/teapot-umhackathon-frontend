"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Project } from "@/types/client-types";
import { useGetProjectByUserId } from "@/hooks/useProject";
import Cookies from "js-cookie";

type CurrentProjectContextType = {
  currentProject: Project | null;
  setCurrentProject: (project: Project) => void;
};

const CurrentProjectContext = createContext<
  CurrentProjectContextType | undefined
>(undefined);

export function CurrentProjectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const userId = Cookies.get("user_id") ?? "";
  const { data: projects = [], isLoading: isLoadingProject } =
    useGetProjectByUserId(userId);

  // Auto-select first project
  useEffect(() => {
    if (projects.length && !currentProject) {
      setCurrentProject(projects[0]);
    }
  }, [projects, currentProject]);

  return (
    <CurrentProjectContext.Provider
      value={{ currentProject, setCurrentProject }}
    >
      {children}
    </CurrentProjectContext.Provider>
  );
}

export function useCurrentProject() {
  const context = useContext(CurrentProjectContext);

  if (!context) {
    throw new Error(
      "useCurrentProject must be used within CurrentProjectProvider",
    );
  }

  return context;
}
