import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, LogOut, Palette, UserCircle } from "lucide-react";
import Link from "next/link";

export default function ClientSettings() {
  return (
    <div className="flex flex-col items-center px-20 py-4">
      <div className="flex flex-col w-[40vw] gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-brand-primary">
              Settings
            </CardTitle>
            <CardDescription>
              Manage your account, preferences, and application settings in one
              place.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link href={"/crm-account"}>
              <Button
                size="lg"
                variant={"ghost"}
                className="flex gap-2 justify-start w-full"
              >
                <UserCircle />
                Account
              </Button>
            </Link>

            <Button
              size="lg"
              variant={"ghost"}
              className="flex gap-2 justify-start"
            >
              <Palette />
              Theme
            </Button>

            <Button
              size="lg"
              variant={"ghost"}
              className="flex gap-2 justify-start"
            >
              <CreditCard />
              Subscriptions
            </Button>

            <Button
              size="lg"
              variant={"ghost"}
              className="flex gap-2 justify-start text-destructive"
            >
              <LogOut />
              Log out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
