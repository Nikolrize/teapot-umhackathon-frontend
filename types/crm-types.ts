export type User = {
  userId: string;
  username: string;
  email: string;
  password: string;
  role: "masterAdmin" | "admin" | "client";
  credits: number;
};

export type ModelSettings = {
  llmId: string;
  name: string;
  apiKey: string;
  provider: string;
  model: string;
  temperature: number;
  topP: number;
  maxTokens: number;
  tokenUnit: number;
  inputTokenCost: number;
  outputTokenCost: number;
};