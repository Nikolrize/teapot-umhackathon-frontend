import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "./fetcher";
import { BackendReference } from "@/types/client-types";

export const useGetReferences = (userId: string, agentId: string) =>
  useQuery<BackendReference[]>({
    queryKey: ["references", userId, agentId],
    queryFn: () =>
      fetcher(`/client/references/user/${userId}/agent/${agentId}`),
    enabled: !!userId && !!agentId,
    staleTime: 30_000, // 30 seconds — references rarely change
  });

export const useAddReference = () => {
  const queryClient = useQueryClient();
  return useMutation<
    BackendReference,
    Error,
    { user_id: string; session_id: string; content: string }
  >({
    mutationFn: (data) =>
      fetcher("/client/references", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["references"] });
    },
  });
};

export const useUpdateReference = () => {
  const queryClient = useQueryClient();
  return useMutation<
    BackendReference,
    Error,
    { reference_id: string; user_id: string; content: string }
  >({
    mutationFn: ({ reference_id, ...data }) =>
      fetcher(`/client/references/update/${reference_id}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["references"] });
    },
  });
};

export const useDeleteReference = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, { reference_id: string; user_id: string }>({
    mutationFn: ({ reference_id, user_id }) =>
      fetcher(
        `/client/references/delete/${reference_id}?user_id=${user_id}`,
        { method: "POST" }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["references"] });
    },
  });
};
