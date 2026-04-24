import { z } from "zod";

export const updateUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["masterAdmin", "admin", "client"]),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must have minimum 6 characters")
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
