export type ProjectFormValues = {
  projectName: string;
  projectDescription?: string;
  businessName: string;
  businessType: string;
  businessContext: string;
  goal: string;
  budgetMin: number;
  budgetMax: number;
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
