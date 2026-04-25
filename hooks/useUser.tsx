import { User } from "@/types/crm-types";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "./fetcher";

export const useGetUserById = (searchTerm: string) => {
  return useQuery<User>({
    queryKey: ["user", searchTerm],
    queryFn: () => fetcher(`/api/user/get/${searchTerm}`),
    enabled: !!searchTerm,
  });
};

export const useGetAllUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetcher(`/api/admin/users`),
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
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: {
        username: string;
        email: string;
        password: string;
      };
    }) => {
      return fetcher(`/api/user/update/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetcher(`/api/user/delete/${id}`, {
        method: "POST",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      return fetcher(`/api/users/update/avatar`, {
        method: "POST",
        body: JSON.stringify({ file}),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
