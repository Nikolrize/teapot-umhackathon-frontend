"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { toast } from "sonner";

import { User } from "@/types/crm-types";
import { updateUserSchema } from "@/schemas/crm-schemas";
import z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  children?: ReactNode;
  user: User;
};

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;

export default function EditUserDialog({ children, user }: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user
      ? {
          username: user.username,
          email: user.email,
          role: user.role,
        }
      : undefined,
  });

  const onSubmit = (data: UpdateUserFormValues) => {
    try {
      console.log("UPDATED USER:", data);
      toast.success("User updated successfully");
      reset();
    } catch (err) {
      toast.error("Failed to update user");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-brand-primary">Edit User</DialogTitle>
          <DialogDescription>
            Update user details and click save when done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col gap-2">
            <Label>Username</Label>
            <Input {...register("username")} />
            {errors.username && (
              <span className="text-destructive text-xs">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input {...register("email")} />
            {errors.email && (
              <span className="text-destructive text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col gap-2">
            <Label>Role</Label>
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.role && (
              <span className="text-destructive text-xs">
                {errors.role.message}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" className="bg-brand-primary">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
