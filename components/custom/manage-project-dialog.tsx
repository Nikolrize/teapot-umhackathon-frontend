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
import {
  Control,
  Controller,
  useForm,
  UseFormGetValues,
} from "react-hook-form";
import { toast } from "sonner";
import { ProjectFormValues } from "@/app/interfaces/client-interface";

type Mode = "create" | "edit";

type ProjectDialogProps = {
  children: ReactNode;
  mode?: Mode;
  projectData?: ProjectFormValues;
};

export default function ManageProjectDialog({
  children,
  mode = "create",
  projectData,
}: ProjectDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    defaultValues:
      mode === "edit" && projectData
        ? projectData
        : {
            projectName: "",
            projectDescription: "",
            businessName: "",
            businessType: "",
            businessContext: "",
            goal: "",
            budgetMin: 1000,
            budgetMax: 25000,
          },
  });

  const handleOpenChange = (val: boolean) => {
    setOpen(val);

    if (val && mode === "edit" && projectData) {
      reset(projectData);
    }

    if (val && mode === "create") {
      reset({
        projectName: "",
        projectDescription: "",
        businessName: "",
        businessType: "",
        businessContext: "",
        goal: "",
        budgetMin: 1000,
        budgetMax: 25000,
      });
    }
  };

  const onSubmit = (data: ProjectFormValues) => {
    try {
      // Create API / Update API
      console.log("FORM DATA:", data);
      reset();
      setOpen(false);

      if (mode === "edit") {
        toast.success("Project Updated");
      } else {
        toast.success("New Project Created");
      }
    } catch (err) {
      console.error(err);
      if (mode === "edit") {
        toast.error("Update failed");
      } else {
        toast.error("Unable to create new project");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-3xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <Input
                {...register("projectName", {
                  required: "Project name is required",
                })}
                placeholder="Project 1"
              />
              {errors.projectName && (
                <span className="text-red-500 text-xs">
                  {errors.projectName.message}
                </span>
              )}
            </div>

            {/* Project Description */}
            <Label>Project Description:</Label>
            <Textarea
              {...register("projectDescription")}
              placeholder="(optional)"
              maxLength={200}
            />

            {/* Business Name */}
            <Label>Business Name:</Label>
            <div className="flex flex-col gap-2">
              <Input
                {...register("businessName", {
                  required: "Business name is required",
                })}
                placeholder="Company A"
              />
              {errors.businessName && (
                <span className="text-red-500 text-xs">
                  {errors.businessName.message}
                </span>
              )}
            </div>

            {/* Business Type, Context and Budget Range */}
            <Label>Business Type:</Label>
            <BusinessTypeSelect control={control} />
            <Label>Business Context:</Label>
            <BusinessContextDialog control={control} />
            <Label>Budget Range:</Label>
            <BudgetRangeSlider control={control} getValues={getValues} />

            {/* Goal */}
            <Label>Goal:</Label>
            <div className="flex flex-col gap-2">
              <Input
                {...register("goal", { required: "Goal is required" })}
                placeholder="Maximise ROI / Reduce Cost / Scale Fast"
              />
              {errors.goal && (
                <span className="text-red-500 text-xs">
                  {errors.goal.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>

            <Button type="submit" className="bg-brand-primary">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function BusinessTypeSelect({
  control,
}: {
  control: Control<ProjectFormValues>;
}) {
  return (
    <Controller
      control={control}
      name="businessType"
      rules={{ required: "Business type is required" }}
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
            <span className="text-red-500 text-xs">
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
  control: Control<ProjectFormValues>;
}) {
  const [value, setValue] = useState("");
  return (
    <Controller
      control={control}
      name="businessContext"
      rules={{ required: "Business context is required" }}
      render={({ field, fieldState }) => (
        <Dialog>
          <div className="flex flex-col gap-2">
            <DialogTrigger asChild>
              <Textarea
                placeholder="Click to set business context"
                maxLength={200}
                className="max-h-20"
                value={field.value}
              />
            </DialogTrigger>
            {fieldState.error && (
              <span className="text-red-500 text-xs">
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
              className="max-h-[70vh]"
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

function BudgetRangeSlider({
  control,
  getValues,
}: {
  control: Control<ProjectFormValues>;
  getValues: UseFormGetValues<ProjectFormValues>;
}) {
  return (
    <div className="flex gap-2 w-full">
      <div className="flex flex-col gap-2 w-full">
        <Label className="text-xs text-muted-foreground">Min Range</Label>

        <Controller
          control={control}
          name="budgetMin"
          rules={{
            validate: (value) =>
              value <= getValues("budgetMax") ||
              "Min must be less than or equal to Max",
          }}
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
                <span className="text-red-500 text-xs">
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
          name="budgetMax"
          rules={{
            validate: (value) =>
              value >= getValues("budgetMin") ||
              "Max must be more than or equal to Min",
          }}
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
                <span className="text-red-500 text-xs">
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
