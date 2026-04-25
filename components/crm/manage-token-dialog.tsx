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
import { User } from "@/types/crm-types";
import { z } from "zod";
import { tokenSchema } from "@/schemas/crm-schemas";

type Props = {
  children?: ReactNode;
  user: User;
};

type CreditForm = z.infer<typeof tokenSchema>;

export default function ManageTokenDialog({ children, user }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreditForm>({
    resolver: zodResolver(tokenSchema),
    defaultValues: {
      tokens: user.max_token,
    },
  });

  const tokens = watch("tokens");
  const isHighValue = Number(tokens) > 1_000_000;

  const onSubmit = (data: CreditForm) => {
    try {
      console.log("UPDATE CREDITS:", user.id, data);
      toast.success("Tokens updated successfully");
      reset();
    } catch (err) {
      toast.error("Failed to update tokens");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-brand-primary">
            Manage Tokens
          </DialogTitle>
          <DialogDescription>
            Adjust the user's token balance. This will override the current
            value.
          </DialogDescription>
        </DialogHeader>

        {/* Current balance */}
        <div className="text-sm text-muted-foreground">
          Current balance:{" "}
          <span className="font-semibold text-foreground">
            {user.max_token?.toLocaleString()}
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>New Token Amount</Label>

            <Input
              type="number"
              {...register("tokens", { valueAsNumber: true })}
            />

            {errors.tokens && (
              <span className="text-destructive text-xs">
                {errors.tokens.message}
              </span>
            )}

            {isHighValue && (
              <span className="text-yellow-600 text-xs">
                This is a very large token amount. Please double-check before
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
              Update Tokens
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
