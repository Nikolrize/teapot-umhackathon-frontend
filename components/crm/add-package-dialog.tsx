"use client";

import { ReactNode, useState } from "react";
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

type FormValues = z.infer<typeof packageSchema>;

type Props = {
  children: ReactNode;
};

export default function AddPackageDialog({ children }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      name: "",
      description: "",
      token: 0,
      price: 0,
      features: [{ value: "" }],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        ...data,
        features: data.features.map((f) => f.value),
      };

      console.log(payload); // API call here

      toast.success(`"${data.name}" created successfully`);

      // ✅ reset + close
      reset();
      setOpen(false);
    } catch (err) {
      toast.error("Failed to create package");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="min-w-xl">
        <DialogHeader>
          <DialogTitle className="text-brand-primary">Add Package</DialogTitle>
          <DialogDescription>
            Create a new subscription package.
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

            {/* Description */}
            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <Input {...register("description")} />
              {errors.description && (
                <p className="text-destructive text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Token */}
            <div className="flex flex-col gap-2">
              <Label>Tokens</Label>
              <Input
                type="number"
                {...register("token", { valueAsNumber: true })}
              />
              {errors.token && (
                <p className="text-destructive text-sm">
                  {errors.token.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <Label>Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  RM
                </span>
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

            {/* Features */}
            <div className="flex flex-col gap-2">
              <Label>Features</Label>

              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <Input
                      {...register(`features.${index}.value`)}
                      placeholder={`Feature ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>

                  {errors.features?.[index]?.value && (
                    <p className="text-destructive text-sm">
                      {errors.features[index]?.value?.message}
                    </p>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() => append({ value: "" })}
              >
                + Add Feature
              </Button>

              {errors.features?.message && (
                <p className="text-destructive text-sm">
                  {errors.features.message}
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
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
