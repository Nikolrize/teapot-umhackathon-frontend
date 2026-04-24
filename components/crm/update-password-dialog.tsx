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
import { ReactNode, useState } from "react";
import { passwordSchema } from "@/schemas/crm-schemas";
import z from "zod";
import { User } from "@/interfaces/crm-interface";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  children?: ReactNode;
  user: User;
};

export type PasswordForm = z.infer<typeof passwordSchema>;

export default function UpdatePasswordDialog({ children, user }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: user
      ? {
          password: user.password,
          confirmPassword: "",
        }
      : undefined,
  });

  const onSubmit = (data: PasswordForm) => {
    console.log("PASSWORD UPDATE", user, data);
    toast.success("Password updated");
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-brand-primary">
            Update Password
          </DialogTitle>
          <DialogDescription>
            Update the user's password. The new password will take effect
            immediately.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Label>Password:</Label>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            {errors.password && (
              <span className="text-destructive text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <Label>Confirm Password:</Label>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            {errors.confirmPassword && (
              <span className="text-destructive text-xs">
                {errors.confirmPassword.message}
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
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
