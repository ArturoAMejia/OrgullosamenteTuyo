import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";

const createFormResponse = async (formResponse) => {
  const { data } = await api.post("/form-response", { formResponse });
  return data;
};

export const useCreateFormResponse = () => {
  return useMutation({
    mutationFn: createFormResponse,
  })
}