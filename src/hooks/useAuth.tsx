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

const resetPasswordAdmin = async (id: string, newPassword: string) => {
  const { data } = await api.post(`/auth/reset-password/${id}`, {
    newPassword,
  });
  return data;
};

export const useResetPasswordAdmin = () => {
  return useMutation({
    mutationFn: (data: { id: string; newPassword: string }) =>
      resetPasswordAdmin(data.id, data.newPassword),
  });
};

const confirmAccount = async (email: string) => {
  const { data } = await api.post("/auth/confirm-account", { email });
  return data;
};

export const useConfirmAccount = () => {
  return useMutation({ mutationFn: (token: string) => confirmAccount(token) });
};

const loginUser = async (username: string, password: string) => {
  const { data } = await api.post("/auth/login-user", { username, password });
  return data;
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      loginUser(data.username, data.password),
  });
};

const verify2FA = async (otp: number, username: string) => {
  const { data } = await api.post("/auth/verify-otp", { otp, username });
  return data;
};


export const useVerify2FA = () => {
  return useMutation({
    mutationFn: (data: { otp: number; username: string }) =>
      verify2FA(data.otp, data.username),
  });
};