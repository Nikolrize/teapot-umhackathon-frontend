"use client";

import {
  CircleUser,
  CreditCard,
  EllipsisVertical,
  Folder,
  HatGlasses,
  Home,
  LayoutDashboard,
  ListChevronsUpDown,
  LogOut,
  MessageCircleMore,
  MoreHorizontal,
  Pencil,
  Plus,
  Settings,
  Trash,
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
import ManageProjectDialog from "./manage-project-dialog";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover";
import { Separator } from "../ui/separator";
import DeleteProjectDialog from "./delete-project-dialog";
import Link from "next/link";
import Cookies from "js-cookie";
import { useGetUserById } from "@/hooks/useUser";
import { useGetAgents } from "@/hooks/useAgent";
import { useCreateSession } from "@/hooks/useSession";
import { Project, Agent } from "@/types/client-types";
import { User } from "@/types/crm-types";
import { useCurrentProject } from "@/contexts/current-project-provider";
import { useGetProjectByUserId } from "@/hooks/useProject";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ClientSidebar() {
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
          router.push(`/client-agents/${agent.agent_id}/${session.session_id}`);
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
    <Sidebar className="w-fit">
      <SidebarHeader>
        <ProjectSelectorPopover
          currentProject={currentProject}
          projects={projects}
        />
      </SidebarHeader>

      <SidebarContent className="cursor-pointer">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/client-home">
                <SidebarMenuButton>
                  <Home />
                  Home
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/client-dashboard">
                <SidebarMenuButton>
                  <LayoutDashboard />
                  Dashboard
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/client-chat">
                <SidebarMenuButton>
                  <MessageCircleMore />
                  Chat
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/client-agents">
                <SidebarMenuButton>
                  <HatGlasses />
                  Agents
                </SidebarMenuButton>
              </Link>
              <SidebarMenuSub>
                {agents.map((agent: Agent) => (
                  <SidebarMenuSubItem key={agent.agent_id}>
                    <SidebarMenuSubButton
                      onClick={() => handleAgentClick(agent)}
                      aria-disabled={loadingAgentId === agent.agent_id}
                      className="cursor-pointer"
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
        {user && <ClientProfilePopover user={user} />}
      </SidebarFooter>
    </Sidebar>
  );
}

export function ClientProfilePopover({ user }: { user: User }) {
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
              <AvatarImage
                src={user?.avatar_url ? user.avatar_url : "/icons/user.png"}
                alt="user-png"
              />
              <AvatarFallback>CN</AvatarFallback>
              {/* <AvatarBadge className={user?.status === "online" ? "bg-green-600" : "bg-red-600"} /> */}
            </Avatar>
            {user.username}
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

        <Link href={"/client-account"}>
          <Button variant={"ghost"} className="flex gap-2 justify-start w-full">
            <CircleUser className="text-muted-foreground" /> Account
          </Button>
        </Link>

        <Link href={"/client-settings"}>
          <Button variant={"ghost"} className="flex gap-2 justify-start w-full">
            <Settings className="text-muted-foreground" /> Settings
          </Button>
        </Link>

        <Link href={"/client-subscriptions"}>
          <Button variant={"ghost"} className="flex gap-2 justify-start w-full">
            <CreditCard className="text-muted-foreground" /> Subscriptions
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

export function ProjectSelectorPopover({
  projects,
  currentProject,
}: {
  projects: Project[];
  currentProject: Project | null;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <SidebarMenuButton size={"lg"}>
          <div className="flex flex-1 items-center gap-2">
            <Button size={"icon-lg"} asChild>
              <div>
                <Folder />
              </div>
            </Button>
            {currentProject?.project_name}
          </div>
          <ListChevronsUpDown />
        </SidebarMenuButton>
      </PopoverTrigger>

      <PopoverContent side="right">
        <PopoverHeader>
          <PopoverTitle className="text-muted-foreground text-xs">
            Projects
          </PopoverTitle>
        </PopoverHeader>

        {projects.map((item) => (
          <ManageProjectPopover key={item.project_id} currentProject={item} />
        ))}

        <Separator />
        <ManageProjectDialog>
          <Button variant={"ghost"} size={"lg"}>
            <div className="flex flex-1 items-center gap-2">
              <Button variant={"outline"} size={"icon-sm"} asChild>
                <div>
                  <Plus />
                </div>
              </Button>
              Create New Project
            </div>
          </Button>
        </ManageProjectDialog>
      </PopoverContent>
    </Popover>
  );
}

export function ManageProjectPopover({
  currentProject,
}: {
  currentProject: Project;
}) {
  const { setCurrentProject } = useCurrentProject();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"secondary"}
          size={"lg"}
          onClick={() => setCurrentProject(currentProject)}
        >
          <div className="flex flex-1 items-center justify-between gap-2">
            <div className="flex gap-2 items-center">
              <Button size={"icon-sm"} asChild>
                <div>
                  <Folder />
                </div>
              </Button>
              {currentProject.project_name}
            </div>
            <MoreHorizontal />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent side="right" className="w-[10vw]">
        <PopoverHeader>
          <PopoverTitle className="text-muted-foreground text-xs">
            Manage Project
          </PopoverTitle>
        </PopoverHeader>

        <ManageProjectDialog mode="edit" projectData={currentProject}>
          <Button variant={"secondary"} className="justify-start gap-4">
            <Pencil /> Edit
          </Button>
        </ManageProjectDialog>

        <DeleteProjectDialog projectData={currentProject}>
          <Button variant={"destructive"} className="justify-start gap-4">
            <Trash /> Delete
          </Button>
        </DeleteProjectDialog>
      </PopoverContent>
    </Popover>
  );
}
