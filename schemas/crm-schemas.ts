import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(3, "Username must have minimum 3 characters"),
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must have minimum 8 characters")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number"),
  role: z.enum(["Master Admin", "Admin", "Client"]),
});

export const updateUserSchema = z.object({
  username: z.string().min(3, "Username must have minimum 3 characters"),
  email: z.email(),
  role: z.enum(["Master Admin", "Admin", "Client"]),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must have minimum 8 characters")
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .regex(/[0-9]/, "Password must contain at least 1 number"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const tokenSchema = z.object({
  tokens: z
    .number({ message: "tokens must be a number" })
    .min(0, "tokens cannot be negative"),
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

export const packageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  token: z.number("Token is required").min(1, "Token must be more than 0"),
  price: z
    .number("Price is required")
    .min(0, "Price must be more than or equal to 0"),
  features: z
    .array(z.object({ value: z.string().min(1, "Cannot be empty") }))
    .min(1, "At least one feature required"),
});
