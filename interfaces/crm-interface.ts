export type User = {
  userId: string;
  username: string;
  email: string;
  password: string;
  role: "masterAdmin" | "admin" | "client";
  credits: number;
};