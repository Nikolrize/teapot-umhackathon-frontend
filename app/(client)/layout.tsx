import ClientHeader from "@/components/custom/client-header";
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
      <div className="min-h-full w-full flex flex-col">
        <ClientHeader />
        {children}
      </div>
    </SidebarProvider>
  );
}
