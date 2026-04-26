"use client";

import {
  Bot,
  CircleUser,
  CreditCard,
  EllipsisVertical,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover";
import { Separator } from "../ui/separator";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Agent } from "@/types/client-types";
import { useGetUserById } from "@/hooks/useUser";
import { useGetProjectByUserId } from "@/hooks/useProject";
import { useGetAgents } from "@/hooks/useAgent";
import { useCurrentProject } from "@/contexts/current-project-provider";
import { useCreateSession } from "@/hooks/useSession";
import { useState } from "react";

export default function CRMSidebar() {
  const userId = Cookies.get("user_id") ?? "";
  const router = useRouter();
  const { data: user, isLoading: isLoadingUser } = useGetUserById(userId);
  const { data: projects = [] } = useGetProjectByUserId(userId);
  const { data: agents = [] } = useGetAgents();
  const { currentProject } = useCurrentProject();
  const { mutate: createSession } = useCreateSession();
  const [loadingAgentId, setLoadingAgentId] = useState<string | null>(null);

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
          router.push(`/crm-agents/${agent.agent_id}/${session.session_id}`);
          setLoadingAgentId(null);
        },
        onError: () => {
          toast.error("Failed to start session");
          setLoadingAgentId(null);
        },
      },
    );
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h1 className="font-bold text-brand-primary">CRM</h1>
      </SidebarHeader>

      <SidebarContent className="cursor-pointer">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/crm-dashboard">
                <SidebarMenuButton>
                  <LayoutDashboard />
                  Dashboard
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/crm-users">
                <SidebarMenuButton>
                  <Users />
                  Users
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/crm-subscriptions">
                <SidebarMenuButton>
                  <CreditCard />
                  Subscriptions
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/crm-model">
                <SidebarMenuButton>
                  <Bot />
                  Model Settings
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/crm-agents">
                <SidebarMenuButton>
                  <Settings />
                  Agent Settings
                </SidebarMenuButton>
              </Link>
              <SidebarMenuSub>
                {agents.map((agent: Agent) => (
                  <SidebarMenuSubItem key={agent.agent_id}>
                    <SidebarMenuSubButton
                      onClick={() => handleAgentClick(agent)}
                      aria-disabled={loadingAgentId === agent.agent_id}
                      className="cursor-pointer w-max"
                    >
                      {agent.agent_name}
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <CRMProfilePopover />
      </SidebarFooter>
    </Sidebar>
  );
}

export function CRMProfilePopover() {
  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("user_role");
    Cookies.remove("user_id");
    window.location.href = "/";
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <SidebarMenuButton
          size={"lg"}
          className="bg-muted hover:ring-1 hover:ring-muted-foreground"
        >
          <div className="flex flex-1 items-center gap-2">
            <Avatar>
              <AvatarImage src="/icons/user.png" alt="user-png" />
              <AvatarFallback>CN</AvatarFallback>
              <AvatarBadge className="bg-green-600" />
            </Avatar>
            User
          </div>
          <EllipsisVertical />
        </SidebarMenuButton>
      </PopoverTrigger>

      <PopoverContent side="right" className="w-[30vh]">
        <PopoverHeader>
          <PopoverTitle className="text-muted-foreground text-xs">
            Profile
          </PopoverTitle>
        </PopoverHeader>
        <Link href={"/crm-account"}>
          <Button variant={"ghost"} className="flex gap-2 justify-start w-full">
            <CircleUser className="text-muted-foreground" /> Account{" "}
          </Button>
        </Link>
        <Link href={"/crm-settings"}>
          <Button variant={"ghost"} className="flex gap-2 justify-start w-full">
            <Settings className="text-muted-foreground" /> Settings
          </Button>
        </Link>
        <Separator />
        <Button
          variant={"ghost"}
          className="flex gap-2 justify-start w-full"
          onClick={() => handleLogout()}
        >
          <LogOut className="text-muted-foreground" /> Log out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
