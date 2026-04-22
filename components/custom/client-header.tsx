"use client";

import {
  BadgeMinus,
  ChartNoAxesCombined,
  Coins,
  HomeIcon,
  LayoutDashboard,
  Notebook,
  Pencil,
  Scale,
  ScanSearch,
  Search,
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";

export default function ClientHeader() {
  return (
    <header className="w-full flex border-b-1 border-muted p-4 items-center justify-between">
      <div className="flex gap-4">
        <SidebarTrigger />
        <Separator orientation="vertical" />
        <SearchCommandDialog />
      </div>
      <CreditPopover />
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
            </CommandGroup>
            <CommandSeparator />
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

export function CreditPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Coins />
          12345
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-3">
          <Label className="font-bold text-brand-primary">Credits</Label>
          <span className="text-xs text-muted-foreground">
            Credits are universal currency you use to generate charts, images,
            tables, or any insights accross Teapot.
          </span>
          <span className="text-xs text-brand-primary underline cursor-pointer">
            Learn More
          </span>
          <Separator />
          <Label>Your credits</Label>
          <div className="flex gap-2">
            <Coins size={16} />
            <span>12345 remaining</span>
          </div>
          <Button>Top up</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
