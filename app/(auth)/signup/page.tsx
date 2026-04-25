"use client";

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
import { useSignup } from "@/hooks/useSignup";
import { accountSchema } from "@/schemas/client-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type SignupForm = z.infer<typeof accountSchema>;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(accountSchema),
  });

  const { mutate: signup, isPending } = useSignup();

  const onSubmit = async (data: SignupForm) => {
    signup(data);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-15">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
              <Input {...register("username")} />
              <p className="text-red-500 text-sm">{errors.username?.message}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input {...register("email")} />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Confirm Password</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirm_password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              <p className="text-red-500 text-sm">
                {errors.confirm_password?.message}
              </p>
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Account"}
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
      </form>
    </div>
  );
}
