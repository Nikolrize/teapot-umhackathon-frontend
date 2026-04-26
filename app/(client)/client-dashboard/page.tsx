"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetDashboard, useReorderDashboard } from "@/hooks/useDashboardApi";
import { useCurrentProject } from "@/contexts/current-project-provider";
import { DashboardContent } from "@/types/client-types";

function SortableWidget({ id, content }: { id: string; content: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="h-full cursor-grab active:cursor-grabbing">
        <CardContent className="p-3 h-full">
          <div className="text-sm whitespace-pre-wrap">{content}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ClientDashboard() {
  const [editing, setEditing] = useState(false);

  const { currentProject } = useCurrentProject();
  const { data: dashboard } = useGetDashboard(currentProject?.project_id ?? "");
  const { mutate: reorderWidget } = useReorderDashboard(
    currentProject?.project_id ?? "",
  );

  const widgets =
    dashboard?.content?.map((item: DashboardContent) => ({
      id: item.content_id,
      content: item.content,
    })) ?? [];

  const [items, setItems] = useState(widgets);

  // keep sync when API updates
  useState(() => {
    setItems(widgets);
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex);

    setItems(newItems);

    reorderWidget({
      content_id: active.id,
      new_index: newIndex,
    });
  };

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

        {items.length === 0 ? (
          <p className="text-muted-foreground text-sm">No widgets added yet</p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-3 gap-4">
                {items.map((widget) => (
                  <SortableWidget
                    key={widget.id}
                    id={widget.id}
                    content={widget.content}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
