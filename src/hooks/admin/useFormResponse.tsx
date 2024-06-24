import api from "@/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useGetScoreboard } from "./useScoreboard";

const createFormResponse = async (formResponse) => {
  const { data } = await api.post("/form-response", { formResponse });
  return data;
};

export const useCreateFormResponse = () => {
  const { refetch } = useGetScoreboard();
  return useMutation({
    mutationFn: createFormResponse,
    onSuccess: () => refetch(),
  });
};

const createQuestionaryResponse = async (questionaryResponse) => {
  const { data } = await api.post("/questionary", { questionaryResponse });
  return data;
};

export const useCreateQuestionaryResponse = () => {
  return useMutation({ mutationFn: createQuestionaryResponse });
};

const getQuestionaryResponse = async () => {
  const { data } = await api.get("/questionary");
  return data;
};

export const useGetQuestionaryResponse = () => {
  return useQuery({
    queryKey: ["questionary"],
    queryFn: getQuestionaryResponse,
  });
};

const createExtraPoints = async (formdata) => {
  const { data } = await api.post("/extra-points", { formdata });
  return data;
};

export const useCreateExtraPoints = () => {
  return useMutation({
    mutationFn: createExtraPoints,
  });
};
