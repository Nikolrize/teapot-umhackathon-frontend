"use client";

import {
  Bot,
  CreditCard,
  HomeIcon,
  LayoutDashboard,
  MessageCircleMore,
  Search,
  Settings,
  UserCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { useState } from "react";
import { useGetAgents } from "@/hooks/useAgent";
import { Agent } from "@/types/client-types";
import { useCurrentProject } from "@/contexts/current-project-provider";
import { useCreateSession } from "@/hooks/useSession";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CRMHeader() {
  return (
    <header className="w-full flex border-b-1 border-muted p-4 items-center justify-between">
      <div className="flex gap-4 items-center">
        <SidebarTrigger />
        <Separator orientation="vertical" />
        <h1 className="font-bold text-brand-primary">Teapot</h1>
      </div>

      <div className="flex gap-4 items-center">
        <SearchCommandDialog />
      </div>
    </header>
  );
}

export function SearchCommandDialog() {
  const [open, setOpen] = useState<boolean>(false);

  const { data: agents = [], isLoading } = useGetAgents();
  const { currentProject } = useCurrentProject();
  const { mutate: createSession } = useCreateSession();

  const userId = Cookies.get("user_id") ?? "";
  const router = useRouter();

  const handleAgentClick = (agent: Agent) => {
    if (!currentProject) {
      toast.error("Please create or select a project first");
      return;
    }

    createSession(
      {
        user_id: userId,
        project_id: currentProject.project_id,
        agent_id: agent.agent_id,
        session_name: `${agent.agent_name} Session`,
      },
      {
        onSuccess: (session) => {
          router.push(`/crm-agents/${agent.agent_id}/${session.session_id}`);
        },
        onError: () => {
          toast.error("Failed to start session");
        },
      },
    );
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant="default"
        className="text-xs"
      >
        <Search /> Run Command or Search
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem>
                <HomeIcon />
                <span>Home</span>
              </CommandItem>
              <CommandItem>
                <LayoutDashboard />
                <span>Dashboard</span>
              </CommandItem>
              <CommandItem>
                <MessageCircleMore />
                <span>Chat</span>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Profile">
              <CommandItem>
                <UserCircle />
                <span>Account</span>
              </CommandItem>
              <CommandItem>
                <Settings />
                <span>Settings</span>
              </CommandItem>
              <CommandItem>
                <CreditCard />
                <span>Subscriptions</span>
              </CommandItem>
            </CommandGroup>

            <Separator />

            <CommandGroup heading="Agents">
              {agents.map((item: Agent) => (
                <div key={item.agent_id} onClick={() => handleAgentClick(item)}>
                  <CommandItem>
                    <Bot />
                    <span>{item.agent_name}</span>
                  </CommandItem>
                </div>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
