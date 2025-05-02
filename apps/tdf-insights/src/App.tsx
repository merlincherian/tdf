import React, { useEffect, useState } from 'react';
import {
  RouterProvider,
  Route,
  rootRouteWithContext,
  RouteContext,
  Outlet,
  Router,
  lazyRouteComponent,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './features/ui/layout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const rootRoute = rootRouteWithContext<RouteContext>()({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const rootRedirectRoute = new Route({
  path: '/',
  component: () => {
    router.navigate({ to: '/' });
    return null;
  },
  getParentRoute: () => rootRoute,
});

const dashboardRoute = new Route({
  path: '/dashboard',
  component: lazyRouteComponent(
    () => import('@/pages/dashboard'),
    'DashboardPage',
  ),
  getParentRoute: () => rootRoute,
});

const eventsRoute = new Route({
  path: '/events',
  getParentRoute: () => rootRoute,
});

const eventsIndexRoute = new Route({
  path: '/',
  component: lazyRouteComponent(
    () => import('@/pages/events/main'),
    'EventsPage',
  ),
  getParentRoute: () => eventsRoute,
});

const clientsRoute = new Route({
  path: '/clients',
  getParentRoute: () => rootRoute,
});

const clientsIndexRoute = new Route({
  path: '/',
  component: lazyRouteComponent(
    () => import('@/pages/clients/main'),
    'ClientsPage',
  ),
  getParentRoute: () => clientsRoute,
});

const venuesRoute = new Route({
  path: '/venues',
  getParentRoute: () => rootRoute,
});

const venuesIndexRoute = new Route({
  path: '/',
  component: lazyRouteComponent(
    () => import('@/pages/venues/main'),
    'VenuesPage',
  ),
  getParentRoute: () => venuesRoute,
});

const eventNewRoute = new Route({
  path: '/new',
  component: lazyRouteComponent(
    () => import('@/pages/events/new'),
    'NewEventPage',
  ),
  getParentRoute: () => eventsRoute,
  beforeLoad: ({ context }) => ({
    ...context,
    getBreadcrumbTitle: () => 'New Event',
  }),
});

const eventEditRoute = new Route({
  path: '/edit/$eventId',
  component: lazyRouteComponent(
    () => import('@/pages/events/edit'),
    'EditEventPage',
  ),
  getParentRoute: () => eventsRoute,
  beforeLoad: ({ context }) => ({
    ...context,
    getBreadcrumbTitle: () => 'Edit Event',
  }),
});

const rootRoutes = [
  rootRedirectRoute,
  dashboardRoute,
  venuesRoute.addChildren([venuesIndexRoute]),
  eventsRoute.addChildren([eventsIndexRoute, eventNewRoute, eventEditRoute]),
  clientsRoute.addChildren([clientsIndexRoute]),
];

const routeTree = rootRoute.addChildren(rootRoutes);
export const queryClient = new QueryClient();
export const router = new Router({
  basepath: '/tdf/',
  routeTree,
  defaultPreload: 'intent',
  context: {
    getTitle: () => 'Blank Page',
    getBreadcrumbTitle: () => 'Blank Page',
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {' '}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router}></RouterProvider>{' '}
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default App;
