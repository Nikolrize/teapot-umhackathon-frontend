"use client";

import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useDeleteReference } from "@/hooks/useReferenceApi";
import { toast } from "sonner";

export default function DeleteReferenceDialog({
  children,
  referenceId,
  userId,
}: {
  children: ReactNode;
  referenceId: string;
  userId: string;
}) {
  const { mutate: deleteReference, isPending } = useDeleteReference();

  const handleDelete = () => {
    deleteReference(
      { reference_id: referenceId, user_id: userId },
      {
        onSuccess: () => toast.success("Reference deleted"),
        onError: () => toast.error("Failed to delete reference"),
      },
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Delete Reference
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this reference? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex justify-end gap-2">
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleDelete}
              variant={"destructive"}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
