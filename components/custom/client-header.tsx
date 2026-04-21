import { SidebarTrigger } from "../ui/sidebar";

export default function ClientHeader() {
  return (
    <header className="w-full flex p-4">
      <SidebarTrigger />
      <span>test</span>
    </header>
  );
}
