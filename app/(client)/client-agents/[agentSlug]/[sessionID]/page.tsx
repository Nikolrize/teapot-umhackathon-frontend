"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Blocks,
  Bookmark,
  BookMarked,
  ChevronRight,
  Layers,
  Pencil,
  Plus,
  Send,
  Trash,
  Upload,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { AgentMessage, BackendReference } from "@/types/client-types";
import EditReferenceDialog from "@/components/client/edit-reference-dialog";
import DeleteReferenceDialog from "@/components/client/delete-reference-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DeleteSessionDialog from "@/components/crm/delete-session-dialog";
import {
  useGetSession,
  useGetSwitchableSessions,
  useCreateSession,
  useSendMessage,
  useUploadToChat,
} from "@/hooks/useSession";
import { useGetReferences, useAddReference } from "@/hooks/useReferenceApi";
import { useAddToDashboard } from "@/hooks/useDashboardApi";
import { useCurrentProject } from "@/contexts/current-project-provider";
import Cookies from "js-cookie";

export default function AgentSession({ resizeMode }: { resizeMode?: boolean }) {
  const params = useParams<{ agentSlug: string; sessionID: string }>();
  const agentId = params.agentSlug;
  const sessionId = params.sessionID;
  const router = useRouter();

  const userId = Cookies.get("user_id") ?? "";
  const { currentProject } = useCurrentProject();

  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [refOpen, setRefOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { data: sessionData, isLoading: isLoadingSession } =
    useGetSession(sessionId);
  const session = sessionData?.session;

  const { data: switchableSessions = [] } = useGetSwitchableSessions(
    currentProject?.project_id ?? "",
    agentId,
  );

  const { data: references = [] } = useGetReferences(userId, agentId);

  const { mutateAsync: sendMsg } = useSendMessage(sessionId);
  const { mutateAsync: uploadFile } = useUploadToChat(sessionId);
  const { mutate: addReference } = useAddReference();
  const { mutate: addToDashboard } = useAddToDashboard();
  const { mutate: createSession } = useCreateSession();

  // Reset when the session changes (user switches sessions via the switcher)
  useEffect(() => {
    setMessages([]);
    setHistoryLoaded(false);
  }, [sessionId]);

  // Populate messages from history once per session
  useEffect(() => {
    if (sessionData?.history && !historyLoaded) {
      setMessages(
        sessionData.history.map((h) => ({
          id: h.prompt_id,
          prompt_id: h.prompt_id,
          role: h.content_type === "prompt" ? "client" : "agent",
          content: h.content,
        })),
      );
      setHistoryLoaded(true);
    }
  }, [sessionData, historyLoaded]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing]);

  const { openFileDialog, FileInput, getFileLabel } = useFileUpload({
    onFilesSelected: (selected) => {
      if (!selected) return;
      setFiles((prev) => [...prev, ...selected]);
    },
  });

  const handlePreview = (file: File) => {
    window.open(URL.createObjectURL(file), "_blank");
  };

  const handleSend = async () => {
    if (!input.trim() && files.length === 0) return;

    const textToSend = input.trim();
    const filesToSend = [...files];

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "client",
        content: textToSend || `[Uploaded ${filesToSend.length} file(s)]`,
        files: filesToSend.length ? filesToSend : undefined,
      },
    ]);
    setInput("");
    setFiles([]);
    setIsProcessing(true);

    try {
      for (const file of filesToSend) {
        await uploadFile({ file });
      }

      const chatText =
        textToSend ||
        "Please analyze the uploaded file(s) and provide insights.";
      const data = await sendMsg({ message: chatText });

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          prompt_id: data.prompt_id,
          role: "agent",
          content: data.reply,
        },
      ]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("503") || msg.toLowerCase().includes("unavailable")) {
        toast.error("AI service is unavailable. Please try again in a moment.");
      } else {
        toast.error(msg || "Something went wrong. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddReference = (msg: AgentMessage) => {
    addReference(
      { user_id: userId, session_id: sessionId, content: msg.content ?? "" },
      {
        onSuccess: () => toast.success("Added to references"),
        onError: () => toast.error("Unable to add to references"),
      },
    );
  };

  const handleAddToDashboard = (msg: AgentMessage) => {
    if (!msg.prompt_id) {
      toast.error("Cannot pin this message — please refresh and try again");
      return;
    }
    if (!currentProject) {
      toast.error("No project selected");
      return;
    }
    addToDashboard(
      {
        project_id: currentProject.project_id,
        user_id: userId,
        prompt_id: msg.prompt_id,
        content: msg.content ?? "",
      },
      {
        onSuccess: () => toast.success("Added to dashboard"),
        onError: () => toast.error("Unable to add to dashboard"),
      },
    );
  };

  const handleNewSession = () => {
    if (!currentProject) {
      toast.error("No project selected");
      return;
    }
    createSession(
      {
        user_id: userId,
        project_id: currentProject.project_id,
        agent_id: agentId,
        session_name: `Session ${switchableSessions.length + 1}`,
      },
      {
        onSuccess: (newSession) => {
          router.push(`/client-agents/${agentId}/${newSession.session_id}`);
        },
        onError: () => toast.error("Failed to create session"),
      },
    );
  };

  return (
    <div
      className={cn(
        refOpen ? "pl-4" : "px-20",
        "flex justify-center items-center h-full overflow-hidden gap-4 transition-all duration-300 ease-in-out",
        resizeMode && "p-0 h-full",
      )}
    >
      <div className="flex flex-col max-w-[50vw] h-full w-full gap-4 py-2">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {isLoadingSession ? (
            <AnimatedShinyText className="px-4 text-sm">
              Loading session...
            </AnimatedShinyText>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  msg.role === "client" ? "justify-end" : "justify-start",
                  "flex p-2",
                )}
              >
                <div
                  className={cn(
                    msg.role === "client" &&
                      "bg-muted-foreground text-black rounded max-w-[60%]",
                    "px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap flex flex-col gap-2",
                  )}
                >
                  {msg.content}

                  {msg.files &&
                    msg.files.map((file, i) => (
                      <Card
                        key={i}
                        className="py-1 text-xs cursor-pointer"
                        onClick={() => handlePreview(file)}
                      >
                        <CardContent className="flex items-center gap-2">
                          <span className="truncate">{file.name}</span>
                          <Badge variant="secondary">
                            {getFileLabel(file)}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}

                  {msg.role === "agent" && (
                    <div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size={"icon-sm"}
                            variant="ghost"
                            onClick={() => handleAddReference(msg)}
                          >
                            <Bookmark />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Add as reference</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size={"icon-sm"}
                            variant="ghost"
                            onClick={() => handleAddToDashboard(msg)}
                          >
                            <Blocks />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Add to dashboard</TooltipContent>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {isProcessing && (
            <AnimatedShinyText className="px-4 text-sm">
              Processing your request...
            </AnimatedShinyText>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <Card>
          <CardContent className="flex flex-col gap-2">
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {files.map((file, idx) => (
                  <Card
                    key={idx}
                    className="max-w-50 py-1 text-xs cursor-pointer"
                    onClick={() => handlePreview(file)}
                  >
                    <CardContent className="flex items-center gap-2">
                      <span className="truncate">{file.name}</span>
                      <Badge variant={"secondary"}>{getFileLabel(file)}</Badge>
                      <Button
                        size={"icon-xs"}
                        variant={"destructive"}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFiles((prev) => prev.filter((_, i) => i !== idx));
                        }}
                      >
                        <X />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <Textarea
              className="max-h-[30vh] resize-none overflow-y-auto"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />

            <div className="flex justify-between items-end">
              <Label className="text-muted-foreground text-xs">
                {session?.agent_name ?? ""}
              </Label>

              <div className="flex items-center gap-2">
                {/* Session switcher */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <Layers /> {session?.session_name ?? "Session"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="top" className="max-w-50">
                    <Label className="text-muted-foreground text-xs">
                      Sessions
                    </Label>
                    {switchableSessions.map((s) => (
                      <Popover key={s.session_id}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={
                              s.session_id === sessionId
                                ? "default"
                                : "secondary"
                            }
                            className="justify-between w-full"
                            onClick={() =>
                              router.push(
                                `/client-agents/${agentId}/${s.session_id}`,
                              )
                            }
                          >
                            <span className="text-xs truncate">
                              {s.session_name}
                            </span>
                            <ChevronRight />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent side="right" className="max-w-30">
                          <Label className="text-muted-foreground text-xs">
                            Session Settings
                          </Label>
                          <DeleteSessionDialog
                            sessionName={s.session_name}
                            sessionId={s.session_id}
                            onDeleted={() => {
                              if (s.session_id === sessionId) {
                                router.push("/client-agents");
                              }
                            }}
                          >
                            <Button
                              variant={"destructive"}
                              className="justify-start text-xs gap-2"
                            >
                              <Trash />
                              <span>Delete</span>
                            </Button>
                          </DeleteSessionDialog>
                        </PopoverContent>
                      </Popover>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full mt-1"
                      onClick={handleNewSession}
                    >
                      <Plus /> New Session
                    </Button>
                  </PopoverContent>
                </Popover>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"outline"}
                      size="icon-lg"
                      onClick={() => setRefOpen(!refOpen)}
                    >
                      <BookMarked />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>References</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"outline"}
                      size={"icon-lg"}
                      onClick={openFileDialog}
                    >
                      <Upload />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Upload files</TooltipContent>
                </Tooltip>

                <FileInput />

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleSend}
                      size={"icon-lg"}
                      className="bg-brand-primary"
                      disabled={isProcessing}
                    >
                      <Send />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Send message</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {refOpen && <ReferenceSheet references={references} userId={userId} />}
    </div>
  );
}

function ReferenceSheet({
  references,
  userId,
}: {
  references: BackendReference[];
  userId: string;
}) {
  return (
    <div className="flex-1 flex flex-col gap-4 border-1 h-full p-4 bg-card min-w-[15vw] w-full min-h-0">
      <Label className="font-semibold text-brand-primary">References</Label>

      <div className="overflow-y-auto h-full space-y-4">
        {references.length === 0 ? (
          <span className="text-xs text-muted-foreground mt-2">
            No references yet
          </span>
        ) : (
          references.map((ref) => (
            <Card key={ref.reference_id} className="text-xs">
              <CardContent className="flex flex-col gap-2">
                <p className="whitespace-pre-wrap">{ref.content}</p>
                <div className="flex gap-2">
                  <Tooltip>
                    <EditReferenceDialog reference={ref} userId={userId}>
                      <TooltipTrigger asChild>
                        <Button variant={"outline"} size={"icon-xs"}>
                          <Pencil />
                        </Button>
                      </TooltipTrigger>
                    </EditReferenceDialog>
                    <TooltipContent>Edit reference</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <DeleteReferenceDialog
                      referenceId={ref.reference_id}
                      userId={userId}
                    >
                      <TooltipTrigger asChild>
                        <Button variant={"destructive"} size={"icon-xs"}>
                          <Trash />
                        </Button>
                      </TooltipTrigger>
                    </DeleteReferenceDialog>
                    <TooltipContent>Delete reference</TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
