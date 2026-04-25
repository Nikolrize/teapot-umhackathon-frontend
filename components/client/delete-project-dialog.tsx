import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
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
import { Project } from "@/types/client-types";
import { useDeleteProject } from "@/hooks/useProject";

type DeleteProjectDialogProps = {
  children: ReactNode;
  projectData: Project;
};

export default function DeleteProjectDialog({
  children,
  projectData,
}: DeleteProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutate: deleteProject, isPending } = useDeleteProject();

  const handleDelete = () => {
    deleteProject(projectData.project_id, {
      onSuccess: () => {
        toast.success("Project deleted");
        setOpen(false);
      },
      onError: () => {
        toast.error("Failed to delete project");
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Delete Project
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-bold">{projectData.project_name}</span>?
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex gap-2 justify-end">
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              variant={"destructive"}
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
