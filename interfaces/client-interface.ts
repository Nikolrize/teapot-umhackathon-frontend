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
  confirmPassword: string;
};

export type Message = {
  id: string;
  role: "client" | "agent";
  content?: string;
  files?: File[];
  references?: string[];
};