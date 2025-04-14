import { Event, EventCategories } from "../main";
import { client } from '../../../axios'; // Adjust the import path based on your project structure




export const fetchUpcomingEvents = async (): Promise<Event[]> => {

  const response = client.get("/api/upcoming-events");
 
  return (await response).data;
};

export const fetchAllEvents = async (): Promise<Event[]> => {

  const response = client.get("/api/events");
 
  return (await response).data;
};

export const fetchCategories = async (): Promise<EventCategories[]> => {

  const response = client.get("/api/event-categories");
 
  return (await response).data;
};


