import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from '@tanstack/react-router';
import path from 'path';

type LayoutProps = {
  children: React.ReactNode;
};
const drawerWidth = 240;

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: 'black', // Set background color to black
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              The Decor Factory
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar sx={{ backgroundColor: 'black' }} />
          <Divider />
          <List>
            {[
              { text: 'Dashboard', path: '/dashboard' },
              { text: 'Upcoming Events', path: '/upcoming-events' },
              { text: 'Events', path: '/events' },
              { text: 'Clients', path: '/clients' },
              { text: 'Venues', path: '/venues' },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </div>
  );
};
