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
import { ReactNode } from "react";
import { toast } from "sonner";
import { useDeleteSession } from "@/hooks/useSession";

type Props = {
  children?: ReactNode;
  sessionName: string;
  sessionId: string;
  onDeleted?: () => void;
};

export default function DeleteSessionDialog({
  children,
  sessionName,
  sessionId,
  onDeleted,
}: Props) {
  const { mutate: deleteSession, isPending } = useDeleteSession();

  const handleDelete = () => {
    deleteSession(sessionId, {
      onSuccess: () => {
        toast.success(`"${sessionName}" deleted successfully`);
        onDeleted?.();
      },
      onError: () => {
        toast.error("Failed to delete session");
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Delete Session
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action is permanent and cannot be undone.
            <br />
            <br />
            You are about to delete:
            <span className="font-semibold"> {sessionName}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          Warning: This session and all its messages will be lost.
        </div>

        <div className="flex justify-end gap-2">
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={handleDelete}
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
