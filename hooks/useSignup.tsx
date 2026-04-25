"use client";

import { accountSchema } from "@/schemas/client-schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import z from "zod";

type SignupForm = z.infer<typeof accountSchema>;

const signupRequest = async (data: SignupForm) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    },
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Signup failed");
  }

  return res.json();
};

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signupRequest,
    onSuccess: () => {
      // after signup → go login OR directly login user (depends on backend)
      router.push("/");
    },
  });
};
