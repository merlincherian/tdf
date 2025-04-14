import { useQuery } from "@tanstack/react-query";
import { fetchAllEvents, fetchCategories, fetchUpcomingEvents } from "./api";

export const useGetUpcomingEvents = () => {
  return useQuery({
    queryKey: ["upcoming-events"],
    queryFn: fetchUpcomingEvents,
  });
};

export const useGetEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchAllEvents,
  });
};


export const useGetCategories = () => {
  return useQuery({
    queryKey: ["event-categories"],
    queryFn: fetchCategories,
  });
};
