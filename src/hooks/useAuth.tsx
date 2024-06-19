import api from "@/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";

interface new_user {
  first_name?: string;
  lastname?: string;
  email?: string;
  password?: string;
}

export const registerUser = async (user: new_user) => {
  const { data } = await api.post("/auth/register", user);
  return data;
};

export const useRegisterUser = () => {
  return useMutation({ mutationFn: (user: new_user) => registerUser(user) });
};

const resetPassword = async (email: string) => {
  const { data } = await api.post("/auth/reset-password", { email });
  return data;
};

export const useResetPassword = () => {
  return useMutation({ mutationFn: (email: string) => resetPassword(email) });
};

const resetPasswordToken = async (token: string, password: string) => {
  const { data } = await api.put("/auth/reset-password", { token, password });
  return data;
};

export const useResetPasswordToken = () => {
  return useMutation({
    mutationFn: (data: { token: string; password: string }) =>
      resetPasswordToken(data.token, data.password),
  });
};
