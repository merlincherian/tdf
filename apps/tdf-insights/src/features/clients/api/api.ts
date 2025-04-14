import { Client } from "../main";
import { client } from '../../../axios'; // Adjust the import path based on your project structure




export const fetchClients = async (): Promise<Client[]> => {

  const response = client.get("/api/clients");
 
  return (await response).data;
};
