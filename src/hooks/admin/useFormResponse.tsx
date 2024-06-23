import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";
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
