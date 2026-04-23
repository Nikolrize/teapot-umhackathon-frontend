"use client";

import {
  EllipsisVertical,
  Folder,
  HatGlasses,
  Home,
  LayoutDashboard,
  ListChevronsUpDown,
  MessageCircleMore,
  MoreHorizontal,
  Pencil,
  Plus,
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
              <SidebarMenuButton>
                <Home />
                Home
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <MessageCircleMore />
                Chat
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <HatGlasses />
                Agents
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>Sales Predictor</SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>
                    Pain Point Analyser
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>Profit Optimiser</SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>
                    Decision Recommendation
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>Risk Identifier</SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>
                    Scenario Simulator
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>
                    Resource Optimiser
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ClientProfile />
      </SidebarFooter>
    </Sidebar>
  );
}

export function ClientProfile() {
  return (
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
