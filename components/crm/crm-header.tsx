"use client";

import {
  BadgeMinus,
  ChartNoAxesCombined,
  Coins,
  CreditCard,
  HomeIcon,
  LayoutDashboard,
  MessageCircleMore,
  Notebook,
  Pencil,
  Scale,
  ScanSearch,
  Search,
  Settings,
  UserCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { useState } from "react";
import { useParams } from "next/navigation";
import { agents } from "@/lib/data";
import { Label } from "../ui/label";

export default function CRMHeader() {
  const params = useParams();

  const agentSlug = params["agentSlug"] as string;

  const formatAgentName = (slug?: string) => {
    if (!slug) return "";

    const agent = agents.find((item) => item.slug === slug);

    return agent?.name ?? "Unknown Agent";
  };

  return (
    <header className="w-full flex border-b-1 border-muted p-4 items-center justify-between">
      <div className="flex gap-4 items-center">
        <SidebarTrigger />
        <Separator orientation="vertical" />
        <h1 className="font-bold text-brand-primary">Teapot</h1>
      </div>

      {agentSlug && (
        <div className="flex gap-2">
          <Label className="font-bold">{formatAgentName(agentSlug)}</Label>
        </div>
      )}

      <div className="flex gap-4 items-center">
        <SearchCommandDialog />
      </div>
    </header>
  );
}

export function SearchCommandDialog() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant="default"
        className="text-xs"
      >
        <Search /> Run Command or Search
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem>
                <HomeIcon />
                <span>Home</span>
              </CommandItem>
              <CommandItem>
                <LayoutDashboard />
                <span>Dashboard</span>
              </CommandItem>
              <CommandItem>
                <MessageCircleMore />
                <span>Chat</span>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Profile">
              <CommandItem>
                <UserCircle />
                <span>Account</span>
              </CommandItem>
              <CommandItem>
                <Settings />
                <span>Settings</span>
              </CommandItem>
              <CommandItem>
                <CreditCard />
                <span>Subscriptions</span>
              </CommandItem>
            </CommandGroup>

            <Separator />

            <CommandGroup heading="Agents">
              <CommandItem>
                <ChartNoAxesCombined />
                <span>Sales Predictor</span>
              </CommandItem>
              <CommandItem>
                <ScanSearch />
                <span>Pain Point Analyser</span>
              </CommandItem>
              <CommandItem>
                <Coins />
                <span>Profit Optimiser</span>
              </CommandItem>
              <CommandItem>
                <Scale />
                <span>Decision Recommendation</span>
              </CommandItem>
              <CommandItem>
                <BadgeMinus />
                <span>Risk Identifier</span>
              </CommandItem>
              <CommandItem>
                <Pencil />
                <span>Scenario Simulator</span>
              </CommandItem>
              <CommandItem>
                <Notebook />
                <span>Resource Optimiser</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
