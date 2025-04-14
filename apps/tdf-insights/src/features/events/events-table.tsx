import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useGetEvents } from './api/hooks';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'eventdate', headerName: 'Event Date', width: 200 },
  {
    field: 'client.name',
    headerName: 'Client Name',
    width: 300,
    valueGetter: (value, row) => {
      return row.client.name;
    },
  },

  {
    field: 'venue.name',
    headerName: 'Venue Name',
    width: 300,
    valueGetter: (value, row) => {
      return row.venue.name;
    },
  },
  { field: 'quoteAmount', headerName: 'Quote Amount', width: 150 },
];

const paginationModel = { page: 0, pageSize: 10 };

export const EventsTable = (): JSX.Element => {
  const { data: events, error, isLoading } = useGetEvents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={events}
        columns={columns}
        getRowId={(row) => row.eventid} // Use eventid as the unique identifier
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};
