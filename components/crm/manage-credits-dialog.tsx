"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ReactNode } from "react";
import { User } from "@/interfaces/crm-interface";
import { z } from "zod";
import { creditSchema } from "@/schemas/crm-schemas";

type Props = {
  children?: ReactNode;
  user: User;
};

type CreditForm = z.infer<typeof creditSchema>;

export default function ManageCreditDialog({ children, user }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreditForm>({
    resolver: zodResolver(creditSchema),
    defaultValues: {
      credits: user.credits,
    },
  });

  const credits = watch("credits");
  const isHighValue = Number(credits) > 1_000_000;

  const onSubmit = (data: CreditForm) => {
    try {
      console.log("UPDATE CREDITS:", user.userId, data);
      toast.success("Credits updated successfully");
      reset();
    } catch (err) {
      toast.error("Failed to update credits");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-brand-primary">
            Manage Credits
          </DialogTitle>
          <DialogDescription>
            Adjust the user's credit balance. This will override the current
            value.
          </DialogDescription>
        </DialogHeader>

        {/* Current balance */}
        <div className="text-sm text-muted-foreground">
          Current balance:{" "}
          <span className="font-semibold text-foreground">
            {user.credits.toLocaleString()}
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>New Credit Amount</Label>

            <Input
              type="number"
              {...register("credits", { valueAsNumber: true })}
            />

            {errors.credits && (
              <span className="text-destructive text-xs">
                {errors.credits.message}
              </span>
            )}

            {isHighValue && (
              <span className="text-yellow-600 text-xs">
                This is a very large credit amount. Please double-check before
                submitting.
              </span>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" className="bg-brand-primary">
              Update Credits
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
