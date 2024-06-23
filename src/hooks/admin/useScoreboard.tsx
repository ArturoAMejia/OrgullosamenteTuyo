import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const getScoreboard = async () => {
  const { data } = await api.get("/scoreboard");
  return data;
};

export const useGetScoreboard = () => {
  return useQuery({ queryKey: ["scoreboard"], queryFn: getScoreboard });
};
