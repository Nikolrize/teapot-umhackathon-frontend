export type Project = {
  project_id: string;
  project_name: string;
  project_description?: string;
  business_name: string;
  business_type: string;
  business_context: string;
  goal: string;
  budget_min: number;
  budget_max: number;
};

export type AccountFormValues = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type AgentMessage = {
  id: string;
  role: "client" | "agent";
  content?: string;
  files?: File[];
  references?: string[];
};

export type DashboardWidget = {
  id: string;
  type: "agent_message" | "file" | "chart";
  data: any;
};

export type Reference = {
  id: string;
  content: string;
  role: "agent" | "client";
};

export type Agent = {
  agent_id: string;
  agent_name: string;
  type: string;
  isdisable: string;
  task: string;
  requirements: string;
  max_token: number;
  top_p: number;
  temperature: number;
  model_id: string;
  conversation_starter: string;
};

export type Conversation = {
  conver_id: string;
  user_a_id: string;
  user_b_id: string;
  created_at: string;
  user_a_id_user_user_id: string;
  user_b_id_user_user_id: string;
  messages: Message;
}

export type Message = {
  message_id: string;
  conver_id: string;
  sender_id: string;
  reply_to_id: string;
  content: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}