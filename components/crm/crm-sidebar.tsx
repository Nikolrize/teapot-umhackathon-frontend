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
import { agents } from "@/lib/data";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function CRMSidebar() {
  return (
    <Sidebar className="w-fit">
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
                {agents.map((item, i) => (
                  <SidebarMenuSubItem key={i}>
                    <SidebarMenuSubButton href={`/crm-agents/${item.slug}/1`}>
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
