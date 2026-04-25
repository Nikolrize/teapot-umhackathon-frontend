import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "./fetcher";
import { Dashboard } from "@/types/client-types";

export const useGetDashboard = (projectId: string) =>
  useQuery<Dashboard>({
    queryKey: ["dashboard", projectId],
    queryFn: () => fetcher(`/client/dashboard/${projectId}`),
    enabled: !!projectId,
  });

export const useAddToDashboard = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    Error,
    { project_id: string; user_id: string; prompt_id: string; content: string }
  >({
    mutationFn: ({ project_id, ...data }) =>
      fetcher(`/client/dashboard/${project_id}/add`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard", variables.project_id],
      });
    },
  });
};

export const useDeleteDashboardContent = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, { content_id: string; project_id: string }>({
    mutationFn: ({ content_id }) =>
      fetcher(`/client/dashboard/content/${content_id}/delete`, {
        method: "POST",
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard", variables.project_id],
      });
    },
  });
};
