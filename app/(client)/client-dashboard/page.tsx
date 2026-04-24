"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboard } from "@/contexts/dashboard-provider";
import { DashboardWidget } from "@/interfaces/client-interface";
import { useState } from "react";

export default function ClientDashboard() {
  const [editing, setEditing] = useState<boolean>(false);
  const { widgets } = useDashboard();

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
            widgets.map((widget: any) => (
              <Card key={widget.id} className="col-span-4">
                <CardContent className="p-3">
                  <WidgetRenderer widget={widget} />
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function WidgetRenderer({ widget }: { widget: DashboardWidget }) {
  switch (widget.type) {
    case "agent_message":
      return (
        <div className="text-sm whitespace-pre-wrap">{widget.data.content}</div>
      );

    case "file":
      return <div className="text-sm">📎 {widget.data.name}</div>;

    default:
      return <div>Unknown widget</div>;
  }
}
