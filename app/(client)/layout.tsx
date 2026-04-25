import ClientHeader from "@/components/client/client-header";
import ClientSidebar from "@/components/client/client-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardProvider } from "@/contexts/dashboard-provider";
import { ReferenceProvider } from "@/contexts/reference-provider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ClientSidebar />
      <div className="h-screen w-full flex flex-col">
        <ClientHeader />
        <TooltipProvider>
          <DashboardProvider>
            <ReferenceProvider>{children}</ReferenceProvider>
          </DashboardProvider>
        </TooltipProvider>
      </div>
    </SidebarProvider>
  );
}
