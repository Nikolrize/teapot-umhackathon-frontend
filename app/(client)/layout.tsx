import ClientHeader from "@/components/client/client-header";
import ClientSidebar from "@/components/client/client-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

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
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
