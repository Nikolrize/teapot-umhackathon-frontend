import { z } from "zod";

export const updateUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["masterAdmin", "admin", "client"]),
});

export const passwordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
