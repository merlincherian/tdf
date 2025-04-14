import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "./api";

export const useGetClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });
};

