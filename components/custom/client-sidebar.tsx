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
  Plus,
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
import CreateProjectDialog from "./create-project-dialog";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover";
import { Separator } from "../ui/separator";

export default function ClientSidebar() {
  return (
    <Sidebar className="w-fit">
      <SidebarHeader>
        <ProjectSelector />
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

export function ProjectSelector() {
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

        <Separator />
        <CreateProjectDialog>
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
        </CreateProjectDialog>
      </PopoverContent>
    </Popover>
  );
}
