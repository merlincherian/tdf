// import React, { useState } from 'react';
// import { useGetUpcomingEvents } from './api/hooks';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CardHeader,
//   Avatar,
//   IconButton,
//   Collapse,
//   CardActions,
// } from '@mui/material';
// import { Grid } from '@mui/system';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface Event {
  // eventid: number;
  name: string;
  eventdate: Date;
  venue: {
    name: string;
    address: string;
  };
  client: {
    name: string;
    // email: string;
  };
  quoteAmount: number;
}

export interface EventCategories {
  id: number;
  name: string;
  description: string;
  events: Event[];
}

// export const EventsTable = (): JSX.Element => {
//   const { data: events, error, isLoading } = useGetUpcomingEvents();
//   const [expanded, setExpanded] = useState<Record<number, boolean>>({});

//   const handleExpandClick = (id: number) => {
//     console.log(id, 'clicked');
//     setExpanded((prev: any) => ({ ...prev, [id]: !prev[id] }));
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   if (!events || events.length === 0) {
//     return <div>No events found.</div>;
//   }

//   // Group events by date
//   const groupedEvents = events.reduce(
//     (acc, event) => {
//       const eventDate = new Date(event.eventdate).toLocaleString('en-US', {
//         weekday: 'long', // Add day of the week
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         timeZone: 'UTC',
//       });
//       if (!acc[eventDate]) {
//         acc[eventDate] = [];
//       }
//       acc[eventDate].push(event);
//       return acc;
//     },
//     {} as Record<string, Event[]>,
//   );

//   return (
//     <div>
//       {Object.keys(groupedEvents).map((date) => (
//         <div key={date}>
//           <Typography variant="h5" component="div" gutterBottom>
//             {date}
//           </Typography>
//           <Grid container spacing={2}>
//             {groupedEvents[date].map((event) => (
//               <Grid size={6}>
//                 <Card>
//                   <CardHeader
//                     avatar={
//                       <Avatar aria-label="recipe">
//                         {event.client.name.charAt(0)}
//                       </Avatar>
//                     }
//                     title={event.client.name}
//                     subheader={event.client.email}
//                     action={
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         align="right"
//                       >
//                         ${event.quoteAmount}
//                       </Typography>
//                     }
//                   />
//                   <CardContent>
//                     <Typography variant="h6" component="div">
//                       {event.name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {event.venue.name}
//                     </Typography>
//                     <Typography variant="body2">
//                       {event.venue.address}
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     <Button
//                       size="small"
//                       onClick={() => handleExpandClick(event.eventid)}
//                       aria-expanded={expanded[event.eventid]}
//                       aria-label="show more"
//                     >
//                       Show More
//                     </Button>
//                   </CardActions>
//                   <Collapse
//                     in={expanded[event.eventid]}
//                     timeout="auto"
//                     unmountOnExit
//                   >
//                     <CardContent>
//                       <Typography paragraph>
//                         Additional event details go here.
//                       </Typography>
//                     </CardContent>
//                   </Collapse>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </div>
//       ))}
//     </div>
//   );
// };
