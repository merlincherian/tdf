import { client } from '../../../axios'; // Adjust the import path based on your project structure
import { Venue } from '../main';




export const fetchVenues = async (): Promise<Venue[]> => {

  const response = client.get("/api/venues");
 
  return (await response).data;
};
