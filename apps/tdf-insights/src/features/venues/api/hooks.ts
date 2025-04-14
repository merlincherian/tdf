import { useQuery } from "@tanstack/react-query";
import { fetchVenues } from "./api";

export const useGetVenues = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchVenues,
  });
};
