import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(3, "Username must have minimum 3 characters"),
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must have minimum 6 characters")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter"),
  role: z.enum(["masterAdmin", "admin", "client"]),
});

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

export const creditSchema = z.object({
  credits: z
    .number({ message: "Credits must be a number" })
    .min(0, "Credits cannot be negative"),
});
