"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { agents } from "@/lib/data";
import { Layers } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClientAgents() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center px-20 py-4">
      <div className="flex flex-col w-[70vw] gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-brand-primary">
              Agents
            </CardTitle>
            <CardDescription>
              Here are all the agents that can assist you. Click to start a
              session!
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-4">
            {agents.map((item) => (
              <Card
                key={item.name}
                onClick={() => router.push(`/client-agents/${item.slug}/1`)}
                className="hover:ring-1 hover:ring-muted-foreground cursor-pointer"
              >
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Label className="text-xs text-muted-foreground">
                    <Layers size={14} /> Sessions: 1
                  </Label>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
