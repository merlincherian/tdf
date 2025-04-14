import React from 'react';
import {
  Button,
  Container,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useGetCategories } from './api/hooks';
import { useGetVenues } from '../venues/api/hooks';

export const NewEventForm = ({}) => {
  const { data: categories, error, isLoading } = useGetCategories();
  const {
    data: venues,
    error: venuesError,
    isLoading: venuesLoading,
  } = useGetVenues();

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error loading categories: {error.message}</div>;
  }

  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Add New Event
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField placeholder="Event Name" />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
              {venues?.map((option) => (
                <MenuItem key={option.name} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid size={{ xs: 6, md: 8 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
          </Grid>
          {categories && ( // Conditional rendering based on categories
            <Select
              labelId={`category-label`}
              id={'category'}
              value={categories[0]?.id || ''} // or some default value
              label={'Category'}
            >
              {categories.map((option) => (
                <MenuItem key={option.name} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </Grid>
        <Button>ADD EVENT</Button>
      </Container>
    </div>
  );
};
