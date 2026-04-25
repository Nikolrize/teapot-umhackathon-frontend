"use client";

import AgentSession from "@/app/(client)/client-agents/[agentSlug]/[sessionID]/page";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import { agents } from "@/lib/data";
import { MessageSquareText, SquareTerminal } from "lucide-react";
import { useParams } from "next/navigation";

export default function CRMKnowledgeBaseSettings() {
  const params = useParams();

  const agentSlug = params["agentSlug"] as string;

  const formatAgentName = (slug?: string) => {
    if (!slug) return "";

    const agent = agents.find((item) => item.slug === slug);

    return agent?.name ?? "Unknown Agent";
  };

  return (
    <ResizablePanelGroup orientation="horizontal">
      <ResizablePanel
        defaultSize="50%"
        minSize={"30%"}
        className="p-4 flex flex-col gap-6"
      >
        <h1 className="font-bold text-brand-primary">
          Knowledge Base of{" "}
          <span className="underline">{formatAgentName(agentSlug)}</span>
        </h1>

        <div className="flex flex-col gap-4 flex-1">
          <Label>
            <SquareTerminal size={16} color="aqua" />
            System Prompt
          </Label>
          <Textarea className="flex-1 resize-none field-sizing-fixed"/>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <Label>
            <MessageSquareText size={16} color="yellow" />
            Conversation Starters
          </Label>
          <Textarea className="flex-1 resize-none field-sizing-fixed"/>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%" minSize={"40%"} className="p-4">
        <AgentSession resizeMode />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
