import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
  return (
    <div className="w-full h-screen flex items-center justify-center p-15">
      <Card className="w-[30vw] gap-6">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Fill in the fields to sign up for a new account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label>Username</Label>
            <Input id="username" type="text" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input id="email" type="email" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Confirm Password</Label>
            <Input id="confirm-password" type="password" required />
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Button className="w-full" size={"lg"}>
              Create Account
            </Button>
            <div className="flex gap-2 text-muted-foreground">
              <span>Already have an account?</span>
              <a href={"/login"} className="underline cursor-pointer">
                Log in
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
