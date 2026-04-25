"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAgents } from "@/hooks/useAgent";
import { useCreateSession } from "@/hooks/useSession";
import { useCurrentProject } from "@/contexts/current-project-provider";
import { Agent } from "@/types/client-types";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ClientAgents() {
  const router = useRouter();
  const { data: agents = [] } = useGetAgents();
  const { currentProject } = useCurrentProject();
  const { mutate: createSession } = useCreateSession();
  const [loadingAgentId, setLoadingAgentId] = useState<string | null>(null);
  const userId = Cookies.get("user_id") ?? "";

  const handleAgentClick = (agent: Agent) => {
    if (!currentProject) {
      toast.error("Please create or select a project first");
      return;
    }

    setLoadingAgentId(agent.agent_id);
    createSession(
      {
        user_id: userId,
        project_id: currentProject.project_id,
        agent_id: agent.agent_id,
        session_name: `${agent.agent_name} Session`,
      },
      {
        onSuccess: (session) => {
          router.push(`/client-agents/${agent.agent_id}/${session.session_id}`);
        },
        onError: () => {
          toast.error("Failed to start session");
          setLoadingAgentId(null);
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-center px-20 py-4">
      <div className="flex flex-col w-[70vw] gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-brand-primary">
              Agents
            </CardTitle>
            <CardDescription>
              Here are all the agents that can assist you. Click to start a
              session!
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-4">
            {agents.map((item: Agent) => (
              <Card
                key={item.agent_id}
                onClick={() => handleAgentClick(item)}
                className={cn(
                  "hover:ring-1 hover:ring-muted-foreground cursor-pointer",
                  loadingAgentId === item.agent_id &&
                    "opacity-50 pointer-events-none",
                )}
              >
                <CardHeader>
                  <CardTitle>{item.agent_name}</CardTitle>
                  <CardDescription>{item.task}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
