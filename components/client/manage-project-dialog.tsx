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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { businessType } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Control, Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Project } from "@/types/client-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/schemas/client-schemas";
import { useCreateProject } from "@/hooks/useProject";
import Cookies from "js-cookie";

type Mode = "create" | "edit";

type ProjectDialogProps = {
  children?: ReactNode;
  mode?: Mode;
  projectData?: Project;
};

export default function ManageProjectDialog({
  children,
  mode = "create",
  projectData,
}: ProjectDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const userId = Cookies.get("user_id") ?? "";

  const { mutate: createProject, isPending } = useCreateProject();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues:
      mode === "edit" && projectData
        ? projectData
        : {
            project_id: "",
            project_name: "",
            project_description: "",
            business_name: "",
            business_type: "",
            business_context: "",
            goal: "",
            budget_min: 1000,
            budget_max: 25000,
          },
  });

  const handleOpenChange = (val: boolean) => {
    setOpen(val);

    if (val && mode === "edit" && projectData) {
      reset(projectData);
    }

    if (val && mode === "create") {
      reset({
        project_name: "",
        project_description: "",
        business_name: "",
        business_type: "",
        business_context: "",
        goal: "",
        budget_min: 1000,
        budget_max: 25000,
      });
    }
  };

  const onSubmit = (data: Project) => {
    createProject(
      { data, userId: userId },
      {
        onSuccess: () => {
          toast.success("New Project Created");
          reset();
          setOpen(false);
        },
        onError: () => {
          toast.error("Unable to create new project");
        },
      },
    );

    if (mode === "edit") {
      toast.success("Project Updated");
    } else {
      toast.success("New Project Created");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-3xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-brand-primary">
              {mode === "edit" ? "Edit Project" : "Create New Project"}
            </DialogTitle>
            <DialogDescription>
              {mode === "edit"
                ? "Edit your workspace details here."
                : "Set up a new workspace for your data, goals, and decisions in one place."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 max-h-[70vh] p-2 overflow-y-scroll">
            {/* Project Name */}
            <Label>Project Name:</Label>
            <div className="flex flex-col gap-2">
              <Input {...register("project_name")} placeholder="Project 1" />
              {errors.project_name && (
                <span className="text-destructive text-xs">
                  {errors.project_name.message}
                </span>
              )}
            </div>

            {/* Project Description */}
            <Label>Project Description:</Label>
            <Textarea
              {...register("project_description")}
              placeholder="(optional)"
              maxLength={200}
              className="resize-none"
            />

            {/* Business Name */}
            <Label>Business Name:</Label>
            <div className="flex flex-col gap-2">
              <Input {...register("business_name")} placeholder="Company A" />
              {errors.business_name && (
                <span className="text-destructive text-xs">
                  {errors.business_name.message}
                </span>
              )}
            </div>

            {/* Business Type, Context and Budget Range */}
            <Label>Business Type:</Label>
            <BusinessTypeSelect control={control} />
            <Label>Business Context:</Label>
            <BusinessContextDialog control={control} />
            <Label>Budget Range:</Label>
            <BudgetRangeSlider control={control} />

            {/* Goal */}
            <Label>Goal:</Label>
            <div className="flex flex-col gap-2">
              <Input
                {...register("goal")}
                placeholder="Maximise ROI / Reduce Cost / Scale Fast"
              />
              {errors.goal && (
                <span className="text-destructive text-xs">
                  {errors.goal.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>

            <Button
              type="submit"
              className="bg-brand-primary"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function BusinessTypeSelect({ control }: { control: Control<Project> }) {
  return (
    <Controller
      control={control}
      name="business_type"
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <Select onValueChange={field.onChange} value={field.value} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {businessType.map((item) => (
                  <SelectItem key={item.label} value={item.label}>
                    {item.label}
                    <span className="text-muted-foreground text-xs">
                      ({item.types.join(", ")})
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {fieldState.error && (
            <span className="text-destructive text-xs">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}

export function BusinessContextDialog({
  control,
}: {
  control: Control<Project>;
}) {
  const [value, setValue] = useState("");
  return (
    <Controller
      control={control}
      name="business_context"
      render={({ field, fieldState }) => (
        <Dialog>
          <div className="flex flex-col gap-2">
            <DialogTrigger asChild>
              <Textarea
                placeholder="Click to set business context"
                maxLength={200}
                className="max-h-20 resize-none"
                value={field.value}
              />
            </DialogTrigger>
            {fieldState.error && (
              <span className="text-destructive text-xs">
                {fieldState.error.message}
              </span>
            )}
          </div>
          <DialogContent className="min-w-3xl">
            <DialogHeader>
              <DialogTitle>Business Context</DialogTitle>
              <DialogDescription>
                Write your business context in details for us to assist you
                better.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              placeholder="Brief description about your business"
              maxLength={3000}
              defaultValue={field.value}
              onChange={(e) => setValue(e.target.value)}
              className="max-h-[70vh] resize-none"
            />
            <div className="flex gap-2 justify-center">
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  className="bg-brand-primary"
                  onClick={() => field.onChange(value)}
                >
                  Save
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}
    />
  );
}

function BudgetRangeSlider({ control }: { control: Control<Project> }) {
  return (
    <div className="flex gap-2 w-full">
      <div className="flex flex-col gap-2 w-full">
        <Label className="text-xs text-muted-foreground">Min Range</Label>

        <Controller
          control={control}
          name="budget_min"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-2">
              <Slider
                value={[field.value]}
                min={1000}
                max={25000}
                step={500}
                onValueChange={(val) => field.onChange(val[0])}
              />

              <span className="text-muted-foreground text-xs">
                RM {field.value}
              </span>

              {fieldState.error && (
                <span className="text-destructive text-xs">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label className="text-xs text-muted-foreground">Max Range</Label>

        <Controller
          control={control}
          name="budget_max"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-2">
              <Slider
                value={[field.value]}
                min={25000}
                max={50000}
                step={500}
                onValueChange={(val) => field.onChange(val[0])}
              />

              <span className="text-muted-foreground text-xs">
                RM {field.value}
              </span>

              {fieldState.error && (
                <span className="text-destructive text-xs">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}
