import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "./fetcher";
import { Project } from "@/types/client-types";

export const useGetProjectByProjectId = (id: string) => {
  return useQuery<Project>({
    queryKey: ["projects", id],
    queryFn: () => fetcher(`/client/projects/${id}`),
    enabled: !!id,
  });
};

export const useGetProjectByUserId = (id: string) => {
  return useQuery<Project[]>({
    queryKey: ["projects", id],
    queryFn: () => fetcher(`/client/projects/user/${id}`),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, { data: Project; userId: string }>({
    mutationFn: ({ data, userId }) =>
      fetcher("/client/projects", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          user_id: userId,
        }),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, Project>({
    mutationFn: ({ project_id, ...data }) =>
      fetcher(`/client/projects/update/${project_id}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetcher(`/client/projects/delete/${id}`, {
        method: "POST",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
