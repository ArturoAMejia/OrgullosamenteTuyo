import api from "@/api/api";
import { User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";

interface new_user {
  first_name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  managementId?: string;
}

interface update_user {
  id?: string;
  first_name?: string;
  lastname?: string;
  email?: string;
  username?: string;
}
const getUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

const createUser = async (user: new_user) => {
  const { data } = await api.post("/auth/register", user);
  return data;
};

const editUser = async (user: update_user) => {
  const { data } = await api.put(`/users`, user);
  return data;
};

const deleteUser = async (user: User) => {
  const { data } = await api.patch("/user", user);
  return data;
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const useCreateUser = () => {
  const { refetch } = useGetUsers();

  return useMutation({
    mutationFn: (user: new_user) => createUser(user),
    onSuccess: () => refetch(),
  });
};

export const useEditUser = () => {
  const { refetch } = useGetUsers();
  return useMutation({
    mutationFn: (user: update_user) => editUser(user),
    onSuccess: () => refetch(),
  });
};

const asignTeam = async (userId: string, teamId?: string) => {
  const { data } = await api.post("/team/asign", { userId, teamId });
  return data;
};

export const useAsignTeam = () => {
  const { refetch } = useGetUsers();
  return useMutation({
    mutationFn: (data: { userId: string; teamId?: string }) =>
      asignTeam(data.userId, data?.teamId),
    onSuccess: () => refetch(),
  });
};
