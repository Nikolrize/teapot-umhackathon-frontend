import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher, uploadFetcher } from "./fetcher";
import { BackendMessage, Session } from "@/types/client-types";

export type SessionWithHistory = {
  session: Session;
  history: BackendMessage[];
};

export const useGetSession = (sessionId: string) =>
  useQuery<SessionWithHistory>({
    queryKey: ["session", sessionId],
    queryFn: () => fetcher(`/client/sessions/${sessionId}`),
    enabled: !!sessionId,
    staleTime: 10_000, // 10 seconds — reduces refetches when switching tabs
  });

export const useGetSwitchableSessions = (projectId: string, agentId: string) =>
  useQuery<Session[]>({
    queryKey: ["sessions", "switch", projectId, agentId],
    queryFn: () => fetcher(`/client/sessions/switch/${projectId}/${agentId}`),
    enabled: !!projectId && !!agentId,
    staleTime: 30_000, // 30 seconds — session list rarely changes mid-conversation
  });

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Session,
    Error,
    { user_id: string; project_id: string; agent_id: string; session_name: string }
  >({
    mutationFn: (data) =>
      fetcher("/client/sessions", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, string>({
    mutationFn: (sessionId) =>
      fetcher(`/client/sessions/delete/${sessionId}`, { method: "POST" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};

export const useSendMessage = (sessionId: string) =>
  useMutation<{ reply: string; prompt_id: string }, Error, { message: string }>({
    mutationFn: (data) =>
      fetcher(`/client/sessions/${sessionId}/chat`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });

export const useUploadToChat = (sessionId: string) =>
  useMutation<
    { filename: string; extracted_summary: string; message: string },
    Error,
    { file: File; message?: string }
  >({
    mutationFn: ({ file, message }) => {
      const form = new FormData();
      form.append("file", file);
      if (message) form.append("message", message);
      return uploadFetcher(`/client/sessions/${sessionId}/upload-chat`, form);
    },
  });
