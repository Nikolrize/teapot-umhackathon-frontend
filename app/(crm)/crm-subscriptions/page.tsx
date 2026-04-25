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
import { Dot, Pencil, Trash } from "lucide-react";

export type SubscriptionPackage = {
  name: string;
  description: string;
  token: number;
  features: string[];
  price: number;
};

export const dummyPackage: SubscriptionPackage = {
  name: "Teapot Plus",
  description: "Keep consulting with expanded access",
  token: 100000,
  features: ["feature 1", "feature 2", "feature 3"],
  price: 24,
};

export default function CRMSubscriptions() {
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
            <Card>
              <CardContent className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h1 className="font-bold text-lg">{dummyPackage.name}</h1>
                  </div>

                  <div className="flex gap-2">
                    <EditPackageDialog pkg={dummyPackage}>
                      <Button size={"icon"}>
                        <Pencil />
                      </Button>
                    </EditPackageDialog>

                    <DeletePackageDialog pkg={dummyPackage}>
                      <Button variant={"destructive"} size={"icon"}>
                        <Trash />
                      </Button>
                    </DeletePackageDialog>
                  </div>
                </div>

                <div className="flex gap-1 items-center">
                  <span className="text-muted-foreground">RM</span>
                  <span className="font-semibold text-2xl">
                    {dummyPackage.price}
                  </span>
                  <span className="text-muted-foreground text-xs">/month</span>
                </div>

                <span className="font-semibold">
                  {dummyPackage.description}
                </span>

                <div>
                  <div className="flex gap-1">
                    <span className="text-muted-foreground">Token:</span>
                    <span className="">{dummyPackage.token}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground">Features:</span>

                    {dummyPackage.features.map((item) => (
                      <span key={item} className="flex">
                        <Dot /> {item}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
