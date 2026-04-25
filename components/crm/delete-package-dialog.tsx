"use client";

import { SubscriptionPackage } from "@/app/(crm)/crm-subscriptions/page";
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
import { ReactNode, useState } from "react";
import { toast } from "sonner";

type Props = {
  children: ReactNode;
  pkg: SubscriptionPackage;
  onDelete?: () => Promise<void> | void;
};

export default function DeletePackageDialog({
  children,
  pkg,
  onDelete,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await onDelete?.();
      toast.success(`"${pkg.name}" deleted successfully`);
    } catch (err) {
      toast.error("Failed to delete package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Delete Package
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action is permanent and cannot be undone.
            <br />
            <br />
            You are about to delete:{" "}
            <span className="font-semibold">{pkg.name}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          Warning: Users subscribed to this package may be affected.
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
