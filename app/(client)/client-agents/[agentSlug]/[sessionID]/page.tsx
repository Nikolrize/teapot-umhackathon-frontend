"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Upload, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Badge } from "@/components/ui/badge";

const dummyMessage: Message[] = [
  {
    id: "1",
    role: "client",
    content: "Hi! I'm the client.",
  },
  {
    id: "2",
    role: "ai",
    content: "Hi! I'm your AI agent. How can I help you today?",
  },
];

type Message = {
  id: string;
  role: "client" | "ai";
  content?: string;
  files?: File[];
};

export default function AgentSession() {
  const [messages, setMessages] = useState<Message[]>(dummyMessage);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);

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

    // // mock AI response
    // setTimeout(() => {
    //   const aiMessage: Message = {
    //     id: crypto.randomUUID(),
    //     role: "ai",
    //     content: "AI Message",
    //   };

    //   setMessages((prev) => [...prev, aiMessage]);
    //   setIsProcessing(false);
    // }, 800);
  };

  return (
    <div className="flex flex-col items-center px-20 py-4 h-full overflow-hidden">
      <div className="flex flex-col w-[50vw] h-full gap-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 py-2 ${
                msg.role === "client" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.content && (
                <div
                  className={`px-4 py-2 rounded-2xl text-sm ${
                    msg.role === "client" &&
                    "bg-brand-primary text-black rounded max-w-[60%]"
                  }`}
                >
                  {msg.content}
                </div>
              )}

              {msg.files && (
                <div className="flex flex-col gap-2">
                  {msg.files.map((file, i) => (
                    <Card
                      key={i}
                      className="py-1 text-xs cursor-pointer"
                      onClick={() => handlePreview(file)}
                    >
                      <CardContent className="flex items-center gap-2">
                        <span className="max-w-50 truncate">{file.name}</span>

                        <Badge variant="secondary">{getFileLabel(file)}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isProcessing && (
            <AnimatedShinyText className="px-4 text-sm">
              Processing your request...
            </AnimatedShinyText>
          )}
        </div>

        {/* Input */}
        <Card>
          <CardContent className="flex flex-col gap-2">
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {files.map((file, idx) => (
                  <Card
                    key={idx}
                    className="py-1 text-xs cursor-pointer"
                    onClick={() => handlePreview(file)}
                  >
                    <CardContent className="flex items-center gap-2">
                      <span className="max-w-30 truncate">{file.name}</span>
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
                Estimated Credit Cost: 0
              </Label>

              <div className="flex gap-2">
                <Button
                  variant={"ghost"}
                  size={"icon-lg"}
                  onClick={openFileDialog}
                >
                  <Upload />
                </Button>

                <FileInput />

                <Button
                  onClick={handleSend}
                  size={"icon-lg"}
                  className="bg-brand-primary"
                >
                  <Send />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
