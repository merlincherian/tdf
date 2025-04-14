import { useQuery } from "@tanstack/react-query";
import { fetchMetrics } from "./api";

export const useGetMetrics = () => {
    return useQuery({
      queryKey: ["metrics"],
      queryFn: fetchMetrics,
    });
  };
  