import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "./fetcher";
import { Conversation, Message } from "@/types/client-types";

export const useGetConversationsByUserId = (id: string) => {
  return useQuery<Conversation[]>({
    queryKey: ["conversation", id],
    queryFn: () => fetcher(`/chat/conversations?current_user_id=${id}`),
    enabled: !!id,
  });
};

export const useGetMessagesByConversationId = (id: string) => {
  return useQuery<Message[]>({
    queryKey: ["conversation", id],
    queryFn: () => fetcher(`/chat/conversations/${id}/messages`),
    enabled: !!id,
  });
};

export const useCreateNewConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      target_user_id,
      current_user_id,
    }: {
      target_user_id: string;
      current_user_id: string;
    }) =>
      fetcher(
        `/chat/conversations/?target_user_id=${target_user_id}&current_user_id=${current_user_id}`,
        {
          method: "POST",
        },
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversation"] });
    },
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      conversation_id,
      current_user_id,
      content,
    }: {
      conversation_id: string;
      current_user_id: string;
      content: string;
    }) => {
      return fetcher(
        `/chat/conversations/${conversation_id}/messages?current_user_id=${current_user_id}`,
        {
          method: "POST",
          body: JSON.stringify({ content }),
        },
      );
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversation_id],
      });
    },
  });
};

export const useConversationUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      conversation_id,
      current_user_id,
      file,
    }: {
      conversation_id: string;
      current_user_id: string;
      file: File;
    }) => {
      return fetcher(
        `/chat/conversations/${conversation_id}/upload?current_user_id=${current_user_id}`,
        {
          method: "POST",
          body: JSON.stringify({ file }),
        },
      );
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversation_id],
      });
    },
  });
};
