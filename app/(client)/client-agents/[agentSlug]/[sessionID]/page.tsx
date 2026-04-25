"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Blocks,
  Bookmark,
  BookMarked,
  ChevronRight,
  Layers,
  Pencil,
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
import { Message, Reference } from "@/types/client-types";
import EditReferenceDialog from "@/components/client/edit-reference-dialog";
import DeleteReferenceDialog from "@/components/client/delete-reference-dialog";
import { useReference } from "@/contexts/reference-provider";
import { useDashboard } from "@/contexts/dashboard-provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import RenameSessionDialog from "@/components/crm/rename-session-dialog";
import DeleteSessionDialog from "@/components/crm/delete-session-dialog";
const dummyMessage: Message[] = [
  {
    id: "1",
    role: "client",
    content: "Hi! I'm the client.",
  },
  {
    id: "2",
    role: "agent",
    content: "Hi! I'm your agent. How can I help you today?",
  },
  {
    id: "3",
    role: "agent",
    content: "Hi! I'm your agent. How can I help you today?",
  },
  {
    id: "4",
    role: "agent",
    content: "Hi! I'm your agent. How can I help you today?",
  },
];

export default function AgentSession({ resizeMode }: { resizeMode?: boolean }) {
  const [messages, setMessages] = useState<Message[]>(dummyMessage);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [refOpen, setRefOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { references, addReference } = useReference();
  const { addWidget } = useDashboard();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing]);

  const { openFileDialog, FileInput, getFileLabel } = useFileUpload({
    onFilesSelected: (files) => {
      if (!files) return;

      setFiles((prev) => [...prev, ...Array.from(files)]);
    },
  });

  const handlePreview = (file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url, "_blank");
  };

  const handleSend = () => {
    if (!input.trim() && files.length === 0) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "client",
      content: input,
      files: files.length ? files : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setFiles([]);

    setIsProcessing(true);

    // // mock agent response
    // setTimeout(() => {
    //   const agentMessage: Message = {
    //     id: crypto.randomUUID(),
    //     role: "agent",
    //     content: "agent Message",
    //   };

    //   setMessages((prev) => [...prev, agentMessage]);
    //   setIsProcessing(false);
    // }, 800);
  };

  const handleAddReference = (msg: Message) => {
    try {
      addReference(msg);
      toast.success("Added to references");
    } catch (err) {
      console.error(err);
      toast.error("Unable to add to references");
    }
  };

  const handleAddToDashboard = (msg: Message) => {
    try {
      addWidget({
        id: crypto.randomUUID(),
        type: "agent_message",
        data: msg,
      });
      toast.success("Added to dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Unable to add to dashboard");
    }
  };

  return (
    <div
      className={cn(
        refOpen ? "pl-4" : "px-20",
        "flex justify-center items-center h-full overflow-hidden gap-4 transition-all duration-300 ease-in-out",
        resizeMode && "p-0 h-full",
      )}
    >
      <div className={"flex flex-col max-w-[50vw] h-full w-full gap-4 py-2"}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                msg.role === "client" ? "justify-end" : "justify-start",
                "flex p-2",
              )}
            >
              {/* Chat Bubble */}
              <div
                className={cn(
                  msg.role === "client" &&
                    "bg-muted-foreground text-black rounded max-w-[60%]",
                  "px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap flex flex-col gap-2",
                )}
              >
                {msg.content}

                {/* File Preview */}
                {msg.files &&
                  msg.files.map((file, i) => (
                    <Card
                      key={i}
                      className="py-1 text-xs cursor-pointer"
                      onClick={() => handlePreview(file)}
                    >
                      <CardContent className="flex items-center gap-2">
                        <span className="truncate">{file.name}</span>

                        <Badge variant="secondary">{getFileLabel(file)}</Badge>
                      </CardContent>
                    </Card>
                  ))}

                {/* Add to Reference (Agent message only) */}
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
          ))}

          {/* Agent Processing */}
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
                {/* File Preview */}
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

            {/* Buttons */}
            <div className="flex justify-between items-end">
              <Label className="text-muted-foreground text-xs">
                Estimated Token Cost: 0
              </Label>

              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <Layers /> Session 1
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="top" className="max-w-50">
                    <Label className="text-muted-foreground text-xs">
                      Sessions
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"secondary"}
                          className="justify-between"
                        >
                          <span className="text-xs truncate">Session 1</span>
                          <ChevronRight />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent side="right" className="max-w-30">
                        <Label className="text-muted-foreground text-xs">
                          Session Settings
                        </Label>
                        <RenameSessionDialog defaultName="Session 1">
                          <Button
                            variant={"secondary"}
                            className="justify-start text-xs gap-2"
                          >
                            <Pencil />
                            <span>Rename</span>
                          </Button>
                        </RenameSessionDialog>
                        <DeleteSessionDialog sessionName="Session 1">
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

      {refOpen && <ReferenceSheet references={references} />}
    </div>
  );
}

export function ReferenceSheet({ references }: { references: Reference[] }) {
  return (
    <div className="flex-1 flex flex-col gap-4 border-1 h-full p-4 bg-card min-w-[15vw] w-full">
      <Label className="font-semibold text-brand-primary">References</Label>

      <div className="flex flex-col gap-4 h-full overflow-y-auto">
        {references.length === 0 ? (
          <span className="text-xs text-muted-foreground mt-2">
            No references yet
          </span>
        ) : (
          references.map((msg: Message) => (
            <Card key={msg.id} className="text-xs">
              <CardContent className="flex flex-col gap-2">
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <span className="text-muted-foreground">From: Session 1</span>
                <div className="flex gap-2">
                  <Tooltip>
                    <EditReferenceDialog>
                      <TooltipTrigger asChild>
                        <Button variant={"outline"} size={"icon-xs"}>
                          <Pencil />
                        </Button>
                      </TooltipTrigger>
                    </EditReferenceDialog>
                    <TooltipContent>Edit reference</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <DeleteReferenceDialog>
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
