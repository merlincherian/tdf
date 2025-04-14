import { EventsTable } from "@/features/events/events-table";
import { Button, Typography } from "@mui/material";
import { Link } from '@tanstack/react-router';

export const EventsPage = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>{" "}
      <Button variant="contained" color="primary"><Link to={'/events/new'} params={{}}>
        Add Event
      </Link></Button>
      <EventsTable />
    </div>
  );
};
