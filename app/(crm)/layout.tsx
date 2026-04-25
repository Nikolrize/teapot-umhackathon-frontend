import CRMHeader from "@/components/crm/crm-header";
import CRMSidebar from "@/components/crm/crm-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardProvider } from "@/contexts/dashboard-provider";
import { ReferenceProvider } from "@/contexts/reference-provider";

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <CRMSidebar />
      <div className="h-screen w-full flex flex-col">
        <CRMHeader />
        <TooltipProvider>
          <DashboardProvider>
            <ReferenceProvider>{children}</ReferenceProvider>
          </DashboardProvider>
        </TooltipProvider>
      </div>
    </SidebarProvider>
  );
}
