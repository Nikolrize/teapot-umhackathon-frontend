"use client";

import CardSwap, { Card as CardSwapCard } from "@/components/CardSwap";
import Plasma from "@/components/Plasma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  BadgeMinus,
  ChartNoAxesCombined,
  Coins,
  Notebook,
  Pencil,
  Scale,
  ScanSearch,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function Login() {
  return (
    <main className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={<></>}>
          <Plasma
            color="#9f71eb"
            speed={0.6}
            direction="forward"
            scale={1.2}
            opacity={0.8}
            mouseInteractive={true}
          />
        </Suspense>
      </div>

      {/* Left Panel */}
      <div className="flex w-full items-center p-[10%]">
        <div className="flex flex-col gap-10 w-[30vw]">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-bold">Teapot</h1>
            <h2>Your best intelligent business partner</h2>
          </div>

          <Card className="gap-6">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your username and password to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label>Username</Label>
                <Input id="username" type="text" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Password</Label>
                <Input id="password" type="password" required />
              </div>

              <div className="flex flex-col justify-center items-center gap-4">
                {/* Temporary redirect to homepage */}
                <Button
                  className="w-full"
                  size={"lg"}
                  onClick={() => redirect("/public-home")}
                >
                  Login
                </Button>
                <Separator />
                <div className="flex flex-col w-full gap-2 ">
                  <Button
                    className="w-full gap-2"
                    size={"lg"}
                    variant={"secondary"}
                  >
                    <Image
                      src={"/icons/github.png"}
                      alt={"github-png"}
                      width={20}
                      height={20}
                    />
                    Login with GitHub
                  </Button>
                  <Button
                    className="w-full gap-2"
                    size={"lg"}
                    variant={"secondary"}
                  >
                    <Image
                      src={"/icons/google.png"}
                      alt={"google-png"}
                      width={20}
                      height={20}
                    />
                    Login with Google
                  </Button>
                </div>
                <div className="flex gap-2 text-muted-foreground">
                  <span>Don't have an account?</span>
                  <a href={"/signup"} className="underline cursor-pointer">
                    Sign up
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel */}
        <Suspense fallback={<></>}>
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            skewAmount={6}
            width="clamp(700px, 50vw, 1400px)"
            height="clamp(500px, 50vh, 1200px)"
          >
            <CardSwapCard>
              <h3 className="flex gap-2 p-2 border-b-1 border-white">
                <ChartNoAxesCombined />
                Sales Predictor
              </h3>
              <p>Picture</p>
            </CardSwapCard>
            <CardSwapCard>
              <h3 className="flex gap-2 p-2 border-b-1 border-white">
                <ScanSearch />
                Pain Point Analyser
              </h3>
              <p>Picture</p>
            </CardSwapCard>
            <CardSwapCard>
              <h3 className="flex gap-2 p-2 border-b-1 border-white">
                <Coins />
                Profit Optimizer
              </h3>
              <p>Picture</p>
            </CardSwapCard>
            <CardSwapCard>
              <h3 className="flex gap-2 p-2 border-b-1 border-white">
                <Scale />
                Decision Recommendation
              </h3>
              <p>Picture</p>
            </CardSwapCard>
            <CardSwapCard>
              <h3 className="flex gap-2 p-2 border-b-1 border-white">
                <BadgeMinus />
                Risk Identifier
              </h3>
              <p>Picture</p>
            </CardSwapCard>
            <CardSwapCard>
              <h3 className="flex gap-2 p-2 border-b-1 border-white">
                <Pencil />
                Scenario Simulator
              </h3>
              <p>Picture</p>
            </CardSwapCard>
            <CardSwapCard>
              <h3 className="flex gap-2 p-2 border-b-1 border-white">
                <Notebook />
                Resource Planner
              </h3>
              <p>Picture</p>
            </CardSwapCard>
          </CardSwap>
        </Suspense>
      </div>
    </main>
  );
}
