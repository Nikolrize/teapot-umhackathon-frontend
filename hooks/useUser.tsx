import { User } from "@/types/crm-types";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "./fetcher";

export const useGetUserById = (id: string) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => fetcher(`/api/user/get/${id}`),
    enabled: !!id,
  });
};

export const useAdminCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, User>({
    mutationFn: (data: User) =>
      fetcher("/api/admin/users/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: User) =>
      fetcher(`/api/user/update/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetcher(`/api/user/delete/${id}`, {
        method: "DELETE",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
