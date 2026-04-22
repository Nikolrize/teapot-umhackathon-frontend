import {
  EllipsisVertical,
  Folder,
  HatGlasses,
  Home,
  LayoutDashboard,
  ListChevronsUpDown,
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
    <SidebarMenuButton size={"lg"} className="bg-muted hover:ring-1 hover:ring-muted-foreground">
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
    <SidebarMenuButton size={"lg"}>
      <div className="flex flex-1 items-center gap-2">
        <Button asChild>
          <div>
            <Folder />
          </div>
        </Button>
        Project
      </div>
      <ListChevronsUpDown />
    </SidebarMenuButton>
  );
}
