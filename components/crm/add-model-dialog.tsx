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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { modelSchema } from "@/schemas/crm-schemas";
import z from "zod";
import { Separator } from "../ui/separator";
import { MODEL_OPTIONS } from "@/lib/data";

type ModelFormValues = z.infer<typeof modelSchema>;

type Props = {
  children?: ReactNode;
  onCreate?: (data: ModelFormValues) => Promise<void> | void;
};

export default function AddModelDialog({ children, onCreate }: Props) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<ModelFormValues>({
    resolver: zodResolver(modelSchema),
    defaultValues: {
      name: "",
      apiKey: "",
      provider: "openai",
      model: "gpt-4o",
      temperature: 0.7,
      topP: 1,
      maxTokens: 1000,
      tokenUnit: 1000,
      inputTokenCost: 0,
      outputTokenCost: 0,
    },
  });

  const onSubmit = async (data: ModelFormValues) => {
    try {
      await onCreate?.(data);

      toast.success("Model created successfully");

      reset(); // clear form after create
    } catch (err) {
      toast.error("Failed to create model");
    }
  };

  const models = MODEL_OPTIONS.filter(
    (item) => item.provider === watch("provider"),
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="min-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-brand-primary">
            Add New Model
          </DialogTitle>
          <DialogDescription>
            Create a new LLM configuration with provider, model, and pricing
            settings.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-6 max-h-[60vh] overflow-y-auto p-2">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-muted-foreground">General</Label>
                <Separator />
              </div>

              {/* Name */}
              <div className="flex flex-col gap-2">
                <Label>Name</Label>
                <Input {...register("name")} />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* API Key */}
              <div className="flex flex-col gap-2">
                <Label>API Key</Label>
                <Input {...register("apiKey")} />
                {errors.apiKey && (
                  <p className="text-xs text-destructive">
                    {errors.apiKey.message}
                  </p>
                )}
              </div>

              {/* Provider */}
              <div className="flex flex-col gap-2">
                <Label>Provider</Label>
                <Controller
                  control={control}
                  name="provider"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="gemini">Gemini</SelectItem>
                        <SelectItem value="ilmu">ILMU</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.provider && (
                  <p className="text-xs text-destructive">
                    {errors.provider.message}
                  </p>
                )}
              </div>

              {/* Model */}
              <div className="flex flex-col gap-2">
                <Label>Model</Label>

                <Controller
                  control={control}
                  name="model"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>

                      <SelectContent>
                        {models.map((model) => (
                          <SelectItem key={model.value} value={model.value}>
                            {model.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                {errors.model && (
                  <p className="text-xs text-destructive">
                    {errors.model.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-muted-foreground">
                  Generation
                </Label>
                <Separator />
              </div>

              {/* Temperature */}
              <div className="flex flex-col gap-2">
                <Label>Temperature</Label>
                <Input
                  type="number"
                  step="0.1"
                  {...register("temperature", { valueAsNumber: true })}
                />
                {errors.temperature && (
                  <p className="text-xs text-destructive">
                    {errors.temperature.message}
                  </p>
                )}
              </div>

              {/* Top P */}
              <div className="flex flex-col gap-2">
                <Label>Top P</Label>
                <Input
                  type="number"
                  step="0.1"
                  {...register("topP", { valueAsNumber: true })}
                />
                {errors.topP && (
                  <p className="text-xs text-destructive">
                    {errors.topP.message}
                  </p>
                )}
              </div>

              {/* Max Tokens */}
              <div className="flex flex-col gap-2">
                <Label>Max Tokens</Label>
                <Input
                  type="number"
                  {...register("maxTokens", { valueAsNumber: true })}
                />
                {errors.maxTokens && (
                  <p className="text-xs text-destructive">
                    {errors.maxTokens.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-muted-foreground">Cost</Label>
                <Separator />
              </div>

              {/* Token Unit */}
              <div className="flex flex-col gap-2">
                <Label>Token Unit</Label>
                <Input
                  type="number"
                  {...register("tokenUnit", { valueAsNumber: true })}
                />
                {errors.tokenUnit && (
                  <p className="text-xs text-destructive">
                    {errors.tokenUnit.message}
                  </p>
                )}
              </div>

              {/* Costs */}
              <div className="grid grid-cols-2 gap-4">
                {/* Input Token Cost */}
                <div className="flex flex-col gap-2">
                  <Label>Input Token Cost</Label>

                  <div className="relative">
                    {/* Prefix */}
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      RM
                    </span>

                    {/* Input */}
                    <Input
                      type="number"
                      step="0.0001"
                      className="pl-10 pr-16"
                      {...register("inputTokenCost", { valueAsNumber: true })}
                    />

                    {/* Suffix */}
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground whitespace-nowrap">
                      per {watch("tokenUnit")}
                    </span>
                  </div>

                  {errors.inputTokenCost && (
                    <p className="text-xs text-destructive">
                      {errors.inputTokenCost.message}
                    </p>
                  )}
                </div>

                {/* Output Token Cost */}
                <div className="flex flex-col gap-2">
                  <Label>Output Token Cost</Label>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      RM
                    </span>

                    <Input
                      type="number"
                      step="0.0001"
                      className="pl-10 pr-16"
                      {...register("outputTokenCost", { valueAsNumber: true })}
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground whitespace-nowrap">
                      per {watch("tokenUnit")}
                    </span>
                  </div>
                  {errors.outputTokenCost && (
                    <p className="text-xs text-destructive">
                      {errors.outputTokenCost.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
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
                Create Model
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
