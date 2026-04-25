import { useQuery } from "@tanstack/react-query";
import { fetcher } from "./fetcher";
import { SubscriptionPackage } from "@/types/client-types";

export const useGetSettings = () => {
  return useQuery<SubscriptionPackage[]>({
    queryKey: ["settings"],
    queryFn: () => fetcher(`/admin/settings`),
  });
};