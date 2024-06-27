import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";


const getManagement = async () => {
  const { data } = await api.get("/management");
  return data;
}

export const useGetManagement = () => {
  return useQuery({
    queryKey: ["management"],
    queryFn: getManagement,
  });
}
