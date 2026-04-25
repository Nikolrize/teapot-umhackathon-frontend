"use client";

import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Upload, X } from "lucide-react";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Badge } from "@/components/ui/badge";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import { Message } from "@/types/client-types";
import {
  useConversationUploadFile,
  useGetMessagesByConversationId,
  useSendMessage,
} from "@/hooks/useChat";

export default function ChatPage() {
  const { conversationID } = useParams() as { conversationID: string };
  const currentUserId = Cookies.get("user_id") ?? "";

  const { data: messages = [], isLoading } =
    useGetMessagesByConversationId(conversationID);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { openFileDialog, FileInput, getFileLabel } = useFileUpload({
    onFilesSelected: (files) => {
      if (!files || files.length === 0) return;
      setFile(files[0]); // only take first file
    },
  });

  const { mutate: sendMessage } = useSendMessage();

  const { mutate: uploadFile } = useConversationUploadFile();

  const handleSend = () => {
    if (!input.trim() && !file) return;

    // Instant UI Update
    const tempMessage: Message = {
      id: crypto.randomUUID(),
      conversation_id: conversationID,
      sender_id: currentUserId,
      sender_username: "me",
      reply_to_id: "",
      content: input,
      attachment: null,
      is_deleted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setLocalMessages((prev) => [...prev, tempMessage]);

    if (input && !file) {
      sendMessage(
        {
          conversation_id: conversationID,
          current_user_id: currentUserId,
          content: input,
        },
        {
          onSuccess: (realMessage) => {
            setLocalMessages((prev) =>
              prev.map((msg) =>
                msg.id === tempMessage.id ? realMessage : msg,
              ),
            );
          },
        },
      );
    }

    if (file) {
      uploadFile(
        {
          conversation_id: conversationID,
          current_user_id: currentUserId,
          file: file,
        },
        {
          onSuccess: (realMessage) => {
            setLocalMessages((prev) =>
              prev.map((msg) =>
                msg.id === tempMessage.id ? realMessage : msg,
              ),
            );
          },
        },
      );
    }

    setInput("");
    setFile(null);
  };

  const sortedMessages = [...messages, ...localMessages].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  return (
    <div className="flex-1 flex flex-col h-full gap-4 py-2">
      <div className="flex-1 overflow-y-auto">
        {sortedMessages.map((msg) => {
          const isMe = msg.sender_id === currentUserId;

          return (
            <div
              key={msg.id}
              className={cn(isMe ? "justify-end" : "justify-start", "flex p-2")}
            >
              <div
                className={cn(
                  isMe
                    ? "bg-muted-foreground rounded-br-none text-black"
                    : "bg-secondary rounded-bl-none",
                  "px-4 py-2 rounded-2xl text-sm max-w-[60%] flex flex-col gap-2",
                )}
              >
                {!msg.attachment && msg.content}

                {msg.attachment && (
                  <Card className="py-1 text-xs cursor-pointer">
                    <CardContent className="flex items-center gap-2">
                      <span className="truncate">
                        {msg.attachment.file_name}
                      </span>
                      <Badge variant="secondary">
                        {msg.attachment.file_type}
                      </Badge>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input*/}
      <Card>
        <CardContent className="flex flex-col gap-2">
          {/* File Preview */}
          {file && (
            <div className="flex flex-wrap gap-2">
              <Card
                className="max-w-50 py-1 text-xs cursor-pointer"
                onClick={() => window.open(URL.createObjectURL(file), "_blank")}
              >
                <CardContent className="flex items-center gap-2">
                  <span className="truncate">{file.name}</span>
                  <Badge variant="secondary">{getFileLabel(file)}</Badge>

                  <Button
                    size="icon-xs"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                  >
                    <X />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex gap-2">
            <Textarea
              className="min-h-5 max-h-[25vh] resize-none overflow-y-auto"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />

            {/* Buttons */}
            <Button variant="ghost" size="icon-lg" onClick={openFileDialog}>
              <Upload />
            </Button>

            <FileInput />

            <Button
              onClick={handleSend}
              size="icon-lg"
              className="bg-brand-primary"
            >
              <Send />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
