import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "../ui/sidebar";

export default function ClientSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Teapot</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Agents</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>Profile</SidebarFooter>
    </Sidebar>
  );
}
