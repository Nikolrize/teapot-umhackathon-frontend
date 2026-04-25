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

export type Message = {
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
