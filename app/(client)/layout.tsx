import ClientHeader from "@/components/custom/client-header";
import ClientSidebar from "@/components/custom/client-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ToastProvider } from "@base-ui/react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ClientSidebar />
      <div className="min-h-full w-full flex flex-col">
        <ClientHeader />
        {children}
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
