"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { agents } from "@/lib/data";
import { useRouter } from "next/navigation";

export default function CRMAgents() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center px-20 py-4">
      <div className="flex flex-col w-[70vw] gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-brand-primary">
              Agent Settings
            </CardTitle>
            <CardDescription>
              Here are all the agents that can assist client. Click to access
              their knowledge base settings.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-4">
            {agents.map((item) => (
              <Card
                key={item.name}
                onClick={() => router.push(`/crm-agents/${item.slug}/1`)}
                className="hover:ring-1 hover:ring-muted-foreground cursor-pointer"
              >
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
