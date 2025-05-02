import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useGetEvents } from './api/hooks';
import { Button, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from '@tanstack/react-router';

export const EventsTable = (): JSX.Element => {
  const { data: events, error, isLoading } = useGetEvents();

  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'eventdate', headerName: 'Event Date', width: 200 },
    {
      field: 'client.name',
      headerName: 'Client Name',
      width: 200,
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
    {
      field: '',
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={(event) => {
                event.stopPropagation(); // Prevent row selection

                console.log('Edit button clicked', params.row);
                navigate({ to: `./edit/${params.row.eventid}` }); // Correct usage
              }}
              aria-label="edit"
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={(event) => {
                event.stopPropagation(); // Prevent row selection

                console.log('Delete button clicked', params.row);
              }}
              aria-label="delete"
            >
              <Delete />
            </IconButton>
          </>
        );
      },
      width: 200,
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

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
