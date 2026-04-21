import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SidebarTrigger />
      {children}
    </SidebarProvider>
  );
}
