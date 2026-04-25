"use client";

import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { BackendReference } from "@/types/client-types";
import { useUpdateReference } from "@/hooks/useReferenceApi";
import { toast } from "sonner";

export default function EditReferenceDialog({
  children,
  reference,
  userId,
}: {
  children: ReactNode;
  reference: BackendReference;
  userId: string;
}) {
  const [editText, setEditText] = useState(reference.content);
  const { mutate: updateReference, isPending } = useUpdateReference();

  const handleSave = () => {
    updateReference(
      { reference_id: reference.reference_id, user_id: userId, content: editText },
      {
        onSuccess: () => toast.success("Reference updated"),
        onError: () => toast.error("Failed to update reference"),
      },
    );
  };

  return (
    <Dialog onOpenChange={(open) => { if (open) setEditText(reference.content); }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Reference</DialogTitle>
          <DialogDescription>
            Modify the saved agent response.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="min-h-[150px]"
        />

        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={handleSave}
              className="bg-brand-primary"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
