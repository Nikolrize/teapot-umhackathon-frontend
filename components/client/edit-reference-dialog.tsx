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
import { AgentMessage } from "@/types/client-types";

export default function EditReferenceDialog({
  children,
}: {
  children: ReactNode;
}) {
  const [editingRef, setEditingRef] = useState<AgentMessage | null>(null);
  const [editText, setEditText] = useState("");

  const handleEditReference = (msg: AgentMessage) => {
    setEditingRef(msg);
    setEditText(msg.content ?? "");
  };

  const handleSaveReference = () => {
    if (!editingRef) return;

    // setReferenceMessages((prev) =>
    //   prev.map((m) =>
    //     m.id === editingRef.id ? { ...m, content: editText } : m,
    //   ),
    // );

    setEditingRef(null);
    setEditText("");
  };

  return (
    <Dialog>
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
            <Button onClick={() => setEditingRef(null)}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
          <Button onClick={handleSaveReference} className="bg-brand-primary">
            Save
          </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
