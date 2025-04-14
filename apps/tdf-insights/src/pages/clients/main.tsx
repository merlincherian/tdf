import { ClientsTable } from '@/features/clients/main';
import { Button, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';

export const ClientsPage = () => {
  return (
    <div>
      <ClientsTable />
    </div>
  );
};
