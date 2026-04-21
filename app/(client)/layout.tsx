import ClientSidebar from "@/components/custom/client-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ClientSidebar />
      {children}
    </SidebarProvider>
  );
}
