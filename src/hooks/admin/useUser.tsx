import api from "@/api/api";
import { queryClient } from "@/util/queryClient";
import { User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";

interface new_user {
  first_name?: string;
  lastname?: string;
  email?: string;
  password?: string;
}

const getUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

const createUser = async (user: new_user) => {
  const { data } = await api.post("/auth/register", user);
  return data;
};

const editUser = async (user: User) => {
  const { data } = await api.put(`/user`, user);
  return data;
};

const deleteUser = async (user: User) => {
  const { data } = await api.patch("/user", user);
  return data;
};

export const useGetUsers = () => {
  return useQuery({ queryKey: ["users"], queryFn: getUsers });
};

export const useCreateUser = () => {
  const { refetch } = useGetUsers();
  refetch();
  return useMutation({
    mutationFn: (user: new_user) => createUser(user),
    onSuccess: (data) => {
      queryClient.setQueryData(["Users", { id: data.id }], data);
    },
  });
};

export const useEditUser = () => {
  const { refetch } = useGetUsers();
  refetch();
  return useMutation({
    mutationFn: (User: User) => editUser(User),
    onSuccess: (data) => {
      queryClient.setQueryData(["Users", { id: data.id }], data);
    },
  });
};

const asignTeam = async (userId: string, teamId?: string) => {
  const { data } = await api.post("/team/asign", { userId, teamId });
  return data;
};

export const useAsignTeam = () => {
  const { refetch } = useGetUsers();
  refetch();
  return useMutation({
    mutationFn: (data: { userId: string; teamId?: string }) =>
      asignTeam(data.userId, data?.teamId),
  });
};
