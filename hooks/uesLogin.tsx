"use client";

import { User } from "@/types/crm-types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";

type LoginResponse = {
  status: string;
  access_token: string;
  token_type: string;
  user: User;
};

const loginRequest = async (data: { username: string; password: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) throw new Error("Login failed");

  return res.json();
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data: LoginResponse) => {
      const role = data.user.role;
      const token = data.access_token;
      const id = data.user.id;

      if (token) {
        Cookies.set("access_token", token, { expires: 7 });
        Cookies.set("user_role", role, { expires: 7 });
        Cookies.set("user_id", id, { expires: 7 });
      }

      if (token) {
        if (role === "Client") {
          router.push("/client-home");
        } else if (role === "Admin" || role === "Master Admin") {
          router.push("/crm-dashboard");
        } else {
          router.push("/");
        }
      }
    },
    onError: () => {
      toast.error("Invalid username or password");
    },
  });
};
