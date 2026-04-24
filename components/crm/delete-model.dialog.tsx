"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { ModelSettings } from "@/interfaces/crm-interface";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

type Props = {
  children?: ReactNode;
  model: ModelSettings;
};

export default function DeleteModelDialog({ children, model }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      toast.success(`"${model.name}" deleted successfully`);
    } catch (err) {
      toast.error("Failed to delete model");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Delete Model
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action is permanent and cannot be undone.
            <br />
            <br />
            You are about to delete:
            <span className="font-semibold"> {model.name}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          Warning: Any projects using this model may stop working.
        </div>

        <div className="flex justify-end gap-2">
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
              className="text-destructive"
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
