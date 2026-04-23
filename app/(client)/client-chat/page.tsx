"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Upload, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useFileUpload } from "@/hooks/useFileUpload";

type Message = {
  id: string;
  senderId: string;
  content?: string;
  files?: File[];
};

const currentUserId = "user-1";
const otherUserId = "user-2";

const initialMessages: Message[] = [
  {
    id: "1",
    senderId: "user-2",
    content: "Hey! How are you?",
  },
  {
    id: "2",
    senderId: "user-1",
    content: "I'm good! What about you?",
  },
];

export default function ClientChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { openFileDialog, FileInput, getFileLabel } = useFileUpload({
    onFilesSelected: (files) => {
      if (!files) return;
      setFiles((prev) => [...prev, ...Array.from(files)]);
    },
  });

  const handleSend = () => {
    if (!input.trim() && files.length === 0) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      senderId: currentUserId,
      content: input,
      files: files.length ? files : undefined,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setFiles([]);

    // MOCK reply (replace with backend later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          senderId: otherUserId,
          content: "Got it",
        },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center h-full px-6 py-4 overflow-hidden">
      <div className="flex flex-col w-[50vw] h-full gap-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg) => {
            const isMe = msg.senderId === currentUserId;

            return (
              <div
                key={msg.id}
                className={`flex p-2 ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >
                {/* Chat Bubble */}
                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-[60%] flex flex-col gap-2 whitespace-pre-wrap ${
                    isMe
                      ? "bg-muted-foreground rounded-br-none"
                      : "bg-secondary rounded-bl-none"
                  }`}
                >
                  {msg.content}

                  {/* File Preview */}
                  {msg.files?.map((file, i) => (
                    <Card
                      key={i}
                      className="py-1 text-xs cursor-pointer"
                      onClick={() =>
                        window.open(URL.createObjectURL(file), "_blank")
                      }
                    >
                      <CardContent className="flex items-center gap-2">
                        <span className="truncate">{file.name}</span>
                        <Badge variant="secondary">{getFileLabel(file)}</Badge>
                      </CardContent>
                    </Card>
                  ))}
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
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {files.map((file, idx) => (
                  <Card
                    key={idx}
                    className="max-w-50 py-1 text-xs cursor-pointer"
                    onClick={() =>
                      window.open(URL.createObjectURL(file), "_blank")
                    }
                  >
                    <CardContent className="flex items-center gap-2">
                      <span className="truncate">{file.name}</span>
                      <Badge variant="secondary">{getFileLabel(file)}</Badge>

                      <Button
                        size="icon-xs"
                        variant="destructive"
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
    </div>
  );
}
