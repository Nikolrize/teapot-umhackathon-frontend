"use client";

import AgentSession from "@/app/(client)/client-agents/[agentSlug]/[sessionID]/page";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function CRMKnowledgeBaseSettings() {
  return (
    <ResizablePanelGroup orientation="horizontal">
      <ResizablePanel defaultSize="50%" minSize={"30%"} className="p-4">
        <Label>Knowledge Base Settings</Label>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%" minSize={"40%"} className="p-4">
        <AgentSession resizeMode />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
