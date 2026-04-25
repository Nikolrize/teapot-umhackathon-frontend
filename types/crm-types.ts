export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "Client" | "Admin" | "Master Admin";
  avatar_url?: string;
  status?: string;
  created_at?: string;
  last_seen_at?: string;
  is_inactive?: boolean;
  auth_provider?: string;
  provider_id?: string;
  token_used?: number;
  max_token?: number;
  token_refresh_at?: string;
  purchased_token_remaining?: number;
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
