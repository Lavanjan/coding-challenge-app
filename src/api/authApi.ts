import { authClient } from "./authClient";

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const response = await authClient.post("/login", data);
  return response.data;
};
