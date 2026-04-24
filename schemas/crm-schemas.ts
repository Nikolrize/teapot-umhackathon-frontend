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
  username: z.string().min(3, "Username must have minimum 3 characters"),
  email: z.email(),
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

export const modelSchema = z.object({
  llmId: z.string(),
  name: z.string().min(1, "Name is required"),
  apiKey: z.string().min(1, "API key is required"),
  provider: z.enum(["openai", "gemini", "ilmu"], {
    message: "Select a provider",
  }),
  model: z.enum(
    [
      "gpt-4o",
      "gpt-4o-mini",
      "gpt-3.5-turbo",
      "gemini-1.5-pro",
      "gemini-1.5-flash",
      "ilmu-core",
      "ilmu-lite",
    ],
    { message: "Select a model" },
  ),
  temperature: z
    .number("Temeprature is required")
    .min(0, "Temperature must be more than or equal to 0")
    .max(2, "Temperature must be less than or equal to 2"),
  topP: z
    .number("Top P is required")
    .min(0, "Top P must be more than or equal to 0")
    .max(1, "Top P must be less than or equal to 1"),
  maxTokens: z
    .number("Max tokens is required")
    .min(1, "Max tokens must be more than or equal to 1"),
  tokenUnit: z
    .number("Token unit is required")
    .min(1, "Token unit must be more than or equal to 1"),
  inputTokenCost: z
    .number("Input token cost is required")
    .min(0, "Input token cost cannot be negative"),
  outputTokenCost: z
    .number("Output token cost is required")
    .min(0, "Output token cost cannot be negative"),
});
