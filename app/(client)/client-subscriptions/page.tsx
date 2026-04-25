"use client";
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

export default function CRMSubscriptions() {
  const { data: settings = [], isLoading } = useGetSettings();

  return (
    <div className="flex flex-col items-center px-20 py-4 overflow-y-auto">
      <div className="flex flex-col w-[70vw] gap-4">
        <Card>
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle className="font-bold text-brand-primary">
                Subscription
              </CardTitle>
              <CardDescription>
                Manage your subscription plans easily, upgrade anytime, and
                unlock features that scale with your needs.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="grid grid-cols-3 gap-4">
            {settings.map((item) => (
              <Card key={item.name}>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <h1 className="font-bold text-lg">{item?.name}</h1>
                  </div>

                  <div className="flex gap-1 items-center">
                    <span className="text-muted-foreground">RM</span>
                    <span className="font-semibold text-2xl">
                      {item?.price}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      /month
                    </span>
                  </div>

                  <div>
                    <div className="flex gap-1">
                      <span className="text-muted-foreground">Token:</span>
                      <span className="">{item?.setting_value}</span>
                    </div>
                  </div>

                  <Button>Purchase</Button>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
