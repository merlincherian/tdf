import { client } from '../../../axios'; // Adjust the import path based on your project structure

export interface EventMetrics {
  totalEvents: number;
  totalPaidAmount: number;
  totalQuoteAmount: number;
  uniqueVenues: number;
  uniqueClients: number;
  eventsByCategory: {
    category: string;
    count: number;
  }[];
}

export const fetchMetrics = async (): Promise<EventMetrics> => {
  const response = client.get('/api/metrics');

  return (await response).data;
};
