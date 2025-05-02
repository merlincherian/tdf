import { TextField } from '@mui/material';
import { useGetEvent } from './api/hooks';
import { useParams } from '@tanstack/react-router';

export const EditEventForm = (): JSX.Element => {
  const { eventId } = useParams({ from: '/tdf/events/edit/$eventId' });
  const eventIdNumber = Number(eventId);

  const { data: event, error, isLoading } = useGetEvent(eventIdNumber);
  return (
    <div>
      <TextField id="standard-basic" label="Standard" variant="standard" />
    </div>
  );
};
