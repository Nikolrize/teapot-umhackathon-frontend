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
import { agents } from "@/lib/data";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function ClientSidebar() {
  return (
    <Sidebar className="w-fit">
      <SidebarHeader>
        <ProjectSelectorPopover />
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
                {agents.map((item, i) => (
                  <SidebarMenuSubItem key={i}>
                    <SidebarMenuSubButton
                      href={`/client-agents/${item.slug}/1`}
                    >
                      {item.name}
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <ClientProfilePopover />
      </SidebarFooter>
    </Sidebar>
  );
}

export function ClientProfilePopover() {
  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("user_role");
    Cookies.remove("user_id");
    window.location.href = "/"
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

        <Link href={"/client-account"}>
          <Button variant={"ghost"} className="flex gap-2 justify-start w-full">
            <CircleUser className="text-muted-foreground" /> Account{" "}
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

export function ProjectSelectorPopover() {
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
            Project 1
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

        <ManageProjectPopover />

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

export function ManageProjectPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"secondary"} size={"lg"}>
          <div className="flex flex-1 items-center justify-between gap-2">
            <div className="flex gap-2 items-center">
              <Button size={"icon-sm"} asChild>
                <div>
                  <Folder />
                </div>
              </Button>
              Project 1
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

        <ManageProjectDialog
          mode="edit"
          // Dummy Data
          projectData={{
            projectName: "Project 1",
            projectDescription: "Project Desc 1",
            businessName: "Business Name",
            businessType: "Commerce",
            businessContext: "Business Context",
            goal: "Goal 1",
            budgetMin: 20000,
            budgetMax: 30000,
          }}
        >
          <Button variant={"secondary"} className="justify-start gap-4">
            <Pencil /> Edit
          </Button>
        </ManageProjectDialog>

        <DeleteProjectDialog
          // Dummy Data
          projectData={{
            projectName: "Project 1",
            projectDescription: "Project Desc 1",
            businessName: "Business Name",
            businessType: "Commerce",
            businessContext: "Business Context",
            goal: "Goal 1",
            budgetMin: 20000,
            budgetMax: 30000,
          }}
        >
          <Button variant={"destructive"} className="justify-start gap-4">
            <Trash /> Delete
          </Button>
        </DeleteProjectDialog>
      </PopoverContent>
    </Popover>
  );
}
