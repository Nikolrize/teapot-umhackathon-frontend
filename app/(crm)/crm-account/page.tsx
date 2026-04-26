"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { AccountFormValues } from "@/types/client-types";
import { Eye, EyeOff, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/schemas/client-schemas";
import Cookies from "js-cookie";
import {
  useGetUserById,
  useUpdateAvatar,
  useUpdateUser,
} from "@/hooks/useUser";

export default function CRMAccount() {
  const [image, setImage] = useState<string>("/icons/user.png");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const userId = Cookies.get("user_id") ?? "";
  const { data: user, isLoading: isLoadingUser } = useGetUserById(userId);
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: updateAvatar } = useUpdateAvatar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username ?? "",
        email: user.email ?? "",
        password: "",
        confirm_password: "",
      });
    }
  }, [user, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // instant preview
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    // upload to backend
    updateAvatar(
      { file },
      {
        onSuccess: (res: any) => {
          toast.success("Avatar updated");
          setImage(res.avatar_url);
        },
        onError: () => {
          toast.error("Avatar upload failed");
        },
      },
    );
  };

  const onSubmit = (data: AccountFormValues) => {
    updateUser(
      {
        userId,
        data: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      },
      {
        onSuccess: () => {
          toast.success("Account Details Updated");
        },
        onError: () => {
          toast.error("Update failed");
        },
      },
    );
  };
  return (
    <div className="flex flex-col items-center px-20 py-4">
      <div className="flex flex-col w-[40vw] gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-brand-primary">
              My Account
            </CardTitle>
            <CardDescription>
              Edit your account details here. Click update when you are done.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              <div className="flex items-center gap-4">
                <Avatar className="size-20">
                  <AvatarImage src={image} alt="user-png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                <Button type="button" variant={"outline"} asChild>
                  <Label htmlFor="avatar-upload">
                    <Upload />
                    Upload Image
                  </Label>
                </Button>
              </div>

              <div className="flex flex-col gap-4">
                <Label>Username:</Label>
                <div className="flex flex-col gap-2">
                  <Input {...register("username")} />
                  {errors.username && (
                    <span className="text-destructive text-xs">
                      {errors.username.message}
                    </span>
                  )}
                </div>

                <Label>Email:</Label>
                <div className="flex flex-col gap-2">
                  <Input {...register("email")} />
                  {errors.email && (
                    <span className="text-destructive text-xs">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <Label>Password:</Label>
                <div className="flex flex-col gap-2">
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
                  {errors.password && (
                    <span className="text-destructive text-xs">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <Label>Confirm Password:</Label>
                <div className="flex flex-col gap-2">
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
                  {errors.confirm_password && (
                    <span className="text-destructive text-xs">
                      {errors.confirm_password.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full flex justify-end">
                <Button
                  type="submit"
                  className="bg-brand-primary cursor-pointer"
                >
                  Update
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
