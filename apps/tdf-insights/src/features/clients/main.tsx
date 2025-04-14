import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useGetClients } from './api/hooks';

export interface Client {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { field: 'address', headerName: 'Address', width: 400 },
];

const paginationModel = { page: 0, pageSize: 10 };

export const ClientsTable = (): JSX.Element => {
  const { data: clients, error, isLoading } = useGetClients();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={clients}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};
