"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "../ui/animated-beam";
import {
  Folder,
  HatGlasses,
  LayoutDashboard,
  MessageCircleMore,
} from "lucide-react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import ManageProjectDialog from "./manage-project-dialog";
import Link from "next/link";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-muted p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function ClientGuide() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden p-4"
      ref={containerRef}
    >
      <div className="flex size-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row justify-between text-center">
          <div className="flex flex-col items-center gap-4 max-w-[15vw]">
            <Circle ref={div1Ref}>
              <Folder />
            </Circle>
            <Label className="text-lg">Create Project</Label>
            <span className="text-muted-foreground">
              Set up a workspace to organise your data, goals, and decisions in
              one place.
            </span>
            <ManageProjectDialog>
              <Button variant={"secondary"}>Create New Project</Button>
            </ManageProjectDialog>
          </div>
          <div className="flex flex-col items-center gap-4 max-w-[15vw]">
            <Circle ref={div2Ref}>
              <HatGlasses />
            </Circle>

            <Label className="text-lg">Browse Agents</Label>
            <span className="text-muted-foreground">
              Explore a range of AI agents designed to analyze, predict, and
              optimize different aspects of your business.
            </span>
            <Link href={"/client-agents"}>
              <Button variant={"secondary"}>View Agents</Button>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-4 max-w-[15vw]">
            <Circle ref={div3Ref}>
              <LayoutDashboard />
            </Circle>
            <Label className="text-lg">Customise Dashboard</Label>
            <span className="text-muted-foreground">
              Tailor your dashboard to display the insights, metrics, and agents
              that matter most to you.
            </span>
            <Link href={"/client-dashboard"}>
              <Button variant={"secondary"}>View Dashboard</Button>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-4 max-w-[15vw]">
            <Circle ref={div4Ref}>
              <MessageCircleMore />
            </Circle>
            <Label className="text-lg">Share Insights</Label>
            <span className="text-muted-foreground">
              Export or share your analysis and results with your team to
              support better, data-driven decisions.
            </span>
            <Link href={"/client-chat"}>
              <Button variant={"secondary"}>View Chat</Button>
            </Link>
          </div>
        </div>
      </div>

      <AnimatedBeam
        duration={3}
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
      />
      <AnimatedBeam
        duration={3}
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div3Ref}
      />
      <AnimatedBeam
        duration={3}
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
      />
    </div>
  );
}
