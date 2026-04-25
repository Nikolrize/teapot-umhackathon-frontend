"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetDashboard } from "@/hooks/useDashboardApi";
import { useCurrentProject } from "@/contexts/current-project-provider";
import { DashboardContent } from "@/types/client-types";
import { useState } from "react";

export default function ClientDashboard() {
  const [editing, setEditing] = useState<boolean>(false);
  const { currentProject } = useCurrentProject();
  const { data: dashboard } = useGetDashboard(currentProject?.project_id ?? "");

  const widgets = (dashboard?.content ?? []).map((item: DashboardContent) => ({
    id: item.content_id,
    type: "agent_message" as const,
    data: { content: item.content },
  }));

  return (
    <div className="flex flex-col items-center px-20 py-4">
      <div className="flex flex-col gap-4 w-[70vw]">
        <div className="flex justify-between">
          <h1 className="font-bold text-brand-primary">Dashboard</h1>
          <Button
            variant={editing ? "default" : "secondary"}
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Save" : "Edit"} Dashboard
          </Button>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {widgets.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No widgets added yet
            </p>
          ) : (
            widgets.map((widget) => (
              <Card key={widget.id} className="col-span-4">
                <CardContent className="p-3">
                  <div className="text-sm whitespace-pre-wrap">
                    {widget.data.content}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
