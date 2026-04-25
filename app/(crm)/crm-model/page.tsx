"use client";
import AddModelDialog from "@/components/crm/add-model-dialog";
import DeleteModelDialog from "@/components/crm/delete-model.dialog";
import EditModelDialog from "@/components/crm/edit-model-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { modelSchema } from "@/schemas/crm-schemas";
import { Pencil, Trash } from "lucide-react";
import z from "zod";

type ModelFormValues = z.infer<typeof modelSchema>;

export const dummyModelSetting: ModelFormValues = {
  llmId: "llm_001",
  name: "OpenAI GPT-4 (Default)",
  apiKey: "sk-xxxxxx-xxxxxx",
  provider: "ilmu",
  model: "gpt-4o",
  temperature: 0.7,
  topP: 1,
  maxTokens: 1000,
  tokenUnit: 1000,
  inputTokenCost: 0.03,
  outputTokenCost: 0.06,
};

export default function CRMModelSettings() {
  return (
    <div className="flex flex-col items-center px-20 py-4 overflow-y-auto">
      <div className="flex flex-col w-[70vw] gap-4">
        <Card>
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle className="font-bold text-brand-primary">
                Model Settings
              </CardTitle>
              <CardDescription>
                Configure how the AI model behaves, including response style,
                creativity, and reasoning level.
              </CardDescription>
            </div>
            <AddModelDialog>
              <Button className="bg-brand-primary">Add Model</Button>
            </AddModelDialog>
          </CardHeader>

          <CardContent className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <Label>Model name</Label>
                  <div className="flex gap-2">
                    <EditModelDialog model={dummyModelSetting}>
                      <Button size={"icon"}>
                        <Pencil />
                      </Button>
                    </EditModelDialog>
                    <DeleteModelDialog model={dummyModelSetting}>
                      <Button variant={"destructive"} size={"icon"}>
                        <Trash />
                      </Button>
                    </DeleteModelDialog>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-muted-foreground">Provider:</span>
                  <span className="text-muted-foreground">Model:</span>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
