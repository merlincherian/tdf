
import { VenuesTable } from "@/features/venues/main";
import { Button, Typography } from "@mui/material";
import { Link } from '@tanstack/react-router';

export const VenuesPage = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Venues
      </Typography>{" "}
      <Button variant="contained" color="primary"><Link to={'/venues/new'} params={{}}>
        Add Venue
      </Link></Button>
      <VenuesTable />
    </div>
  );
};
