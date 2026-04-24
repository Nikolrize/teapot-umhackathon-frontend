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

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ReactNode } from "react";

import { createUserSchema } from "@/schemas/crm-schemas";
import z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  children?: ReactNode;
};

export type CreateUserFormValues = z.infer<typeof createUserSchema>;

export default function AddUserDialog({ children }: Props) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "client",
    },
  });

  const onSubmit = (data: CreateUserFormValues) => {
    try {
      console.log("CREATE USER:", data);
      toast.success("User created successfully");
      reset();
    } catch (err) {
      toast.error("Failed to create user");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-brand-primary">Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account. Fill in the details below.
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

          {/* Password */}
          <div className="flex flex-col gap-2">
            <Label>Password</Label>
            <Input type="password" {...register("password")} />
            {errors.password && (
              <span className="text-destructive text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Role (FIXED with Controller) */}
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
            <DialogClose asChild>
              <Button type="submit" className="bg-brand-primary">
                Create User
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
