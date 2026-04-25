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
  prompt_id?: string;
  role: "client" | "agent";
  content?: string;
  files?: File[];
  references?: string[];
};

export type Session = {
  session_id: string;
  user_id: string;
  project_id: string;
  agent_id: string;
  agent_name: string;
  session_name: string;
  project_name: string;
  business_name: string;
  business_type: string;
  business_context: string;
  budget_min: number | null;
  budget_max: number | null;
  goal: string | null;
  requirements: string;
  task: string;
  max_token: number;
  temperature: number;
  top_p: number;
  model_id: string | null;
  isdisable: boolean;
};

export type BackendMessage = {
  prompt_id: string;
  session_id: string;
  content: string;
  content_type: "prompt" | "reply";
  timestamp: string;
};

export type BackendReference = {
  reference_id: string;
  user_id: string;
  agent_id: string;
  session_id: string;
  content: string;
};

export type DashboardContent = {
  content_id: string;
  prompt_id: string;
  dashboard_id: string;
  content: string;
  index: number;
};

export type Dashboard = {
  dashboard_id: string;
  user_id: string;
  project_id: string;
  content: DashboardContent[];
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