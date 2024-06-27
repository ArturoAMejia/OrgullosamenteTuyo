import api from "@/api/api";
import { Team } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";

const getTeams = async () => {
  const { data } = await api.get("/team");
  return data;
};

const createTeam = async (name: string) => {
  const { data } = await api.post("/team", { name });
  return data;
};

const editTeam = async (team: Team) => {
  const { data } = await api.put(`/team`, { team });
  return data;
};

const deleteTeam = async (team: Team) => {
  const { data } = await api.patch("/team", { team });
  return data;
};

export const useGetTeams = () => {
  return useQuery({ queryKey: ["teams"], queryFn: getTeams });
};

export const useCreateTeam = () => {
  const { refetch } = useGetTeams();
  return useMutation({
    mutationFn: (name: string) => createTeam(name),
    onSuccess: () => refetch(),
  });
};

export const useEditTeam = () => {
  const { refetch } = useGetTeams();
  return useMutation({
    mutationFn: (team: Team) => editTeam(team),
    onSuccess: () => refetch(),
  });
};
