"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
    onSuccess: () => {
      router.push("/client-home");
    },
  });
};
