"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "./fetcher";

export function useGetLeadsOverview() {
  return useQuery({
    queryKey: ["leads"],
    queryFn: () => fetcher("/leads/overview"),
  });
}
