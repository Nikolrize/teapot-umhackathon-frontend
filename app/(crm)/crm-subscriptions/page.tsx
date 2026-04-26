"use client";
import AddModelDialog from "@/components/crm/add-model-dialog";
import AddPackageDialog from "@/components/crm/add-package-dialog";
import DeletePackageDialog from "@/components/crm/delete-package-dialog";
import EditPackageDialog from "@/components/crm/edit-package-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetSettings } from "@/hooks/useSystemSetting";
import { Dot, Pencil, Trash } from "lucide-react";

export default function CRMSubscriptions() {
  const { data: settings = [], isLoading } = useGetSettings();

  return (
    <div className="flex flex-col items-center px-20 py-4 overflow-y-auto">
      <div className="flex flex-col w-[70vw] gap-4">
        <Card>
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle className="font-bold text-brand-primary">
                Subscription Settings
              </CardTitle>
              <CardDescription>
                Manage your subscription plan, billing details, and usage
                limits.
              </CardDescription>
            </div>
            <AddPackageDialog>
              <Button className="bg-brand-primary">Add Package</Button>
            </AddPackageDialog>
          </CardHeader>

          <CardContent className="grid grid-cols-3 gap-4">
            {settings.map((item) => (
              <Card key={item.name}>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <h1 className="font-bold text-lg">{item.name}</h1>
                    </div>

                    <div className="flex gap-2">
                      <EditPackageDialog pkg={item}>
                        <Button size={"icon"}>
                          <Pencil />
                        </Button>
                      </EditPackageDialog>

                      <DeletePackageDialog pkg={item}>
                        <Button variant={"destructive"} size={"icon"}>
                          <Trash />
                        </Button>
                      </DeletePackageDialog>
                    </div>
                  </div>

                  <div className="flex gap-1 items-center">
                    <span className="text-muted-foreground">RM</span>
                    <span className="font-semibold text-2xl">{item.price}</span>
                    <span className="text-muted-foreground text-xs">
                      / token
                    </span>
                  </div>

                  <div>
                    <div className="flex gap-1">
                      <span className="text-muted-foreground">Token:</span>
                      <span className="">{item.setting_value}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
