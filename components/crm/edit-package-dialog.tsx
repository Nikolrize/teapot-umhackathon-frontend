"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Label } from "../ui/label";

import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { packageSchema } from "@/schemas/crm-schemas";
import { SubscriptionPackage } from "@/types/client-types";

type FormValues = z.infer<typeof packageSchema>;

type Props = {
  children: ReactNode;
  pkg: SubscriptionPackage;
};

export default function EditPackageDialog({ children, pkg }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  }  = useForm<FormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      name: pkg.name,
      setting_value: pkg.setting_value,
      price: pkg.price,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      
      toast.success(`"${data.name}" updated successfully`);
    } catch (err) {
      toast.error("Failed to update package");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="min-w-xl">
        <DialogHeader>
          <DialogTitle className="text-brand-primary">Edit Package</DialogTitle>
          <DialogDescription>
            Edit subscription package details here. Click save when you are
            done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-4 max-h-[65vh] overflow-y-auto p-2">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input {...register("name")} />
              {errors.name && (
                <p className="text-destructive text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Token */}
            <div className="flex flex-col gap-2">
              <Label>Tokens</Label>
              <Input
                type="number"
                {...register("setting_value", { valueAsNumber: true })}
              />
              {errors.setting_value && (
                <p className="text-destructive text-sm">
                  {errors.setting_value.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <Label>Price</Label>
              <div className="relative">
                {/* Prefix */}
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  RM
                </span>

                {/* Input */}
                <Input
                  type="number"
                  className="pl-10"
                  {...register("price", { valueAsNumber: true })}
                />
              </div>

              {errors.price && (
                <p className="text-destructive text-sm">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>
          {/* Footer */}
          <div className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              className="bg-brand-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
