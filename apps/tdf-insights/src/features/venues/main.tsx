import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useGetVenues } from './api/hooks';

export interface Venue {
  id: number;
  name: string;
  address: string;
  eventCount: number;
  distanceFromOffice: number; // Distance in meters
  uHaulEstimate: number;
  type: string;
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'address', headerName: 'Address', width: 400 },
  { field: 'type', headerName: 'Type', width: 150 },

  { field: 'eventCount', headerName: 'Event Count', width: 100 },
  { field: 'distance', headerName: 'Distance from Office (miles)', width: 100, renderCell: (params) => `${(params.value)} mi` },
  {
    field: 'uHaulEstimate',
    headerName: 'U-Haul Estimate ($)',
    width: 250,
    renderCell: (params) => `$${params.value}`,
  },
];

const paginationModel = { page: 0, pageSize: 10 };

export const VenuesTable = (): JSX.Element => {
  const { data: venues, error, isLoading } = useGetVenues();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={venues}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};
