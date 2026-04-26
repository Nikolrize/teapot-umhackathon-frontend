"use client";

import {
  Bot,
  Coins,
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { useParams, useRouter } from "next/navigation";
import { useGetAgents, useGetAgentWithAgentId } from "@/hooks/useAgent";
import { useGetUserById } from "@/hooks/useUser";
import Cookies from "js-cookie";
import Link from "next/link";
import { Agent } from "@/types/client-types";
import { useCreateSession } from "@/hooks/useSession";
import { useCurrentProject } from "@/contexts/current-project-provider";
import { toast } from "sonner";

export default function ClientHeader() {
  const params = useParams();

  const agentSlug = params["agentSlug"] as string;

  const { data: agent } = useGetAgentWithAgentId(agentSlug || "");

  const agentName = agent?.agent_name ?? "Unknown Agent";

  return (
    <header className="w-full flex border-b-1 border-muted p-4 items-center justify-between">
      <div className="flex gap-4 items-center">
        <SidebarTrigger />
        <Separator orientation="vertical" />
        <h1 className="font-bold text-brand-primary">Teapot</h1>
      </div>

      {agentSlug && (
        <div className="flex gap-2">
          <Label className="font-bold">{agentName}</Label>
        </div>
      )}

      <div className="flex gap-4 items-center">
        <SearchCommandDialog />
        <CreditPopover />
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
          router.push(`/client-agents/${agent.agent_id}/${session.session_id}`);
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
              <Link href="/client-home">
                <CommandItem>
                  <HomeIcon />
                  <span>Home</span>
                </CommandItem>
              </Link>
              <Link href="/client-dashboard">
                <CommandItem>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </CommandItem>
              </Link>
              <Link href="/client-chat">
                <CommandItem>
                  <MessageCircleMore />
                  <span>Chat</span>
                </CommandItem>
              </Link>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Profile">
              <Link href="/client-account">
                <CommandItem>
                  <UserCircle />
                  <span>Account</span>
                </CommandItem>
              </Link>
              <Link href="/client-settings">
                <CommandItem>
                  <Settings />
                  <span>Settings</span>
                </CommandItem>
              </Link>
              <Link href="/client-subscriptions">
                <CommandItem>
                  <CreditCard />
                  <span>Subscriptions</span>
                </CommandItem>
              </Link>
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

export function CreditPopover() {
  const userId = Cookies.get("user_id") ?? "";
  const { data: user, isLoading: isLoadingUser } = useGetUserById(userId);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Coins />
          {user?.max_token}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-3">
          <Label className="font-bold text-brand-primary">Credits</Label>
          <span className="text-xs text-muted-foreground">
            Credits are universal currency you use to generate charts, images,
            tables, or any insights accross Teapot.
          </span>
          <span className="text-xs text-brand-primary underline cursor-pointer">
            Learn More
          </span>
          <Separator />
          <Label>Your credits</Label>
          <div className="flex gap-2">
            <Coins size={16} />
            <span>{user?.max_token} remaining</span>
          </div>
          <Link href={"/client-subscriptions"}>
            <Button className="w-full">Top up</Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
