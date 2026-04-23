import { z } from "zod";

export const accountSchema = z
  .object({
    username: z.string().min(3, "Username must have minimum 3 characters"),
    email: z.email("Invalid email"),
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

export const projectSchema = z
  .object({
    projectName: z
      .string()
      .min(3, "Project name must be at least 3 characters"),

    projectDescription: z.string().max(200).optional().or(z.literal("")),

    businessName: z
      .string()
      .min(3, "Business name must be at least 3 characters"),

    businessType: z.string().min(1, "Business type is required"),

    businessContext: z
      .string()
      .min(1, "Business context is required")
      .max(3000),

    goal: z.string().min(1, "Goal is required"),

    budgetMin: z
      .number()
      .min(1000, "Minimum range is RM 1000")
      .max(25000, "Maximum range is RM 25000"),

    budgetMax: z
      .number()
      .min(25000, "Minimum range is RM 25000")
      .max(50000, "Maximum range is RM 50000"),
  })
  .refine((data) => data.budgetMin <= data.budgetMax, {
    message: "Min budget must be less than or equal to Max budget",
    path: ["budgetMin"],
  });
