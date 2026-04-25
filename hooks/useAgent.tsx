import { useQuery } from "@tanstack/react-query";
import { fetcher } from "./fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Agent } from "@/types/client-types";

export function useGetAgents() {
  return useQuery({
    queryKey: ["agents"],
    queryFn: () => fetcher("/admin/agents"),
  });
}

export function useGetAgentsModels() {
  return useQuery({
    queryKey: ["agents"],
    queryFn: () => fetcher("/admin/agents/available-models"),
  });
}

export function useGetAgentWithAgentId(agentId: string) {
  return useQuery({
    queryKey: ["agent", agentId],
    queryFn: () => fetcher(`/admin/agents/${agentId}`),
    enabled: !!agentId,
  });
}

export function useCreateAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Agent>) =>
      fetcher("/admin/agents", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
  });
}

export function useUpdateAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      agentId,
      data,
    }: {
      agentId: string;
      data: Partial<Agent>;
    }) =>
      fetcher(`/admin/agents/update/${agentId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      queryClient.invalidateQueries({
        queryKey: ["agent", variables.agentId],
      });
    },
  });
}

export function useDeleteAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (agentId: string) =>
      fetcher(`/admin/agents/delete/${agentId}`, {
        method: "DELETE",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
  });
}
