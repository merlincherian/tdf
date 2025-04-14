import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useGetMetrics } from '@/features/dashboard/api/hooks';
import { Grid } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export const DashboardPage = () => {
  const { data: metrics, error, isLoading } = useGetMetrics();
  return (
    <div>
      <Typography variant="h5">TDF Insights</Typography>
      <Grid sx={{ justifySelf: 'flex-end', padding: 2 }}>
        <DatePicker label="From" />
      </Grid>

      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid size={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                {metrics?.totalEvents}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                Total Events
              </Typography>
              <Typography variant="body2">
                Total Events this year
                <br />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                {metrics?.uniqueVenues}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                Total Venues
              </Typography>
              <Typography variant="body2">
                Unique Venues
                <br />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                {metrics?.uniqueClients}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                Total Clients
              </Typography>
              <Typography variant="body2">
                Total Clients served
                <br />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div">
                ${metrics?.totalPaidAmount} / ${metrics?.totalQuoteAmount}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                Total Income
              </Typography>
              <Typography variant="body2">
                Year-to-Date Revenue
                <br />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
