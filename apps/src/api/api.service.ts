import { Injectable } from '@nestjs/common';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PrismaClient,
  Venue,
  Event,
  EventCategory,
  Client,
  DecorItemUsage,
  DecorItem,
} from '@prisma/client';
import { VenueWithEventCount } from './api.controller';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';

export interface EventMetrics {
  totalEvents: number;
  totalPaidAmount: number;
  totalQuoteAmount: number;
  uniqueVenues: number;
  uniqueClients: number;
  eventsByCategory: {
    category: string;
    count: number;
  }[];
}

export interface EventWithClient extends Event {
  client: Client;
  decorItemUsages: {
    quantity: number;
    decorItem: DecorItem; // Correctly reference the DecorItem type
  }[];
}

interface LatLng {
  latitude: number;
  longitude: number;
}

@Injectable()
export class ApiService {
  private prisma = new PrismaClient();

  create(createApiDto: CreateApiDto) {
    return 'This action adds a new api';
  }

  findAll() {
    return `This action returns all api`;
  }

  findOne(id: number) {
    return `This action returns a #${id} api`;
  }

  update(id: number, updateApiDto: UpdateApiDto) {
    return `This action updates a #${id} api`;
  }

  remove(id: number) {
    return `This action removes a #${id} api`;
  }

  async getData(): Promise<Venue[]> {
    return this.prisma.venue.findMany();
  }

  async getDistance(
    origin: LatLng,
    destination: LatLng,
    googleApiKey: string,
  ): Promise<number | null> {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/directions/json',
        {
          params: {
            origin: `${origin.latitude},${origin.longitude}`,
            destination: `${destination.latitude},${destination.longitude}`,
            key: googleApiKey,
          },
        },
      );

      if (response.data.status === 'OK') {
        const route = response.data.routes[0];
        const leg = route.legs[0];
        const distanceInMeters = leg.distance.value;
        const distanceInMiles = distanceInMeters * 0.000621371;
        return Math.round(distanceInMiles); // Round to the nearest whole mile
      } else {
        console.error(
          'Google Directions API request failed:',
          response.data.status,
          response.data.error_message,
        );
        return null;
      }
    } catch (error: any) {
      console.error('Error calling Google Directions API:', error.message);
      return null;
    }
  }

  async getVenue(): Promise<VenueWithEventCount[]> {
    const officeLocation = await this.getCoordinatesFromAddress(
      '1269 Wilton Cres, Yardley PA 19067',
    );

    const venues = await this.prisma.venue.findMany({
      include: {
        _count: {
          select: {
            events: true, // Assuming "events" is the relation name for events associated with a venue
          },
        },
      },
    });

    // Map the result to include the event count as a separate field
    return Promise.all(
      venues.map(async (venue) => {
        // Use a geocoding API to get latitude and longitude from the venue's address
        const coordinates = await this.getCoordinatesFromAddress(venue.address);

        const roundedDistanceInMiles = await this.getDistance(
          officeLocation,
          coordinates,
          process.env.GOOGLE_API_KEY,
        );

        const gasCost = await this.calculateGasCost(
          roundedDistanceInMiles * 2,
          3,
        );

        return {
          ...venue,
          eventCount: venue._count?.events || 0, // Add the event count field
          distance: roundedDistanceInMiles, // Add the distance field
          uHaulEstimate:
            Math.round(roundedDistanceInMiles * 3.98) + 19.95 + gasCost, // Example calculation for U-Haul estimate
        };
      }),
    );
  }

  private async calculateGasCost(
    distance: number,
    gasPrice: number,
  ): Promise<number> {
    const milesPerGallon = 12; // Example value, adjust as needed
    const gallonsUsed = (distance + 5) / milesPerGallon;
    return gallonsUsed * gasPrice;
  }

  private async getCoordinatesFromAddress(
    address: string,
  ): Promise<{ latitude: number; longitude: number }> {
    // Replace this with a call to a geocoding API (e.g., Google Maps API)
    // For example, using Google Maps API:
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address,
          key: process.env.GOOGLE_API_KEY,
        },
      },
    );
    const location = response.data.results[0].geometry.location;
    return { latitude: location.lat, longitude: location.lng };
  }

  async getClients(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }

  async getEvents(): Promise<Event[]> {
    return this.prisma.event.findMany({
      include: {
        venue: true, // Include the related venue data
        client: true, // Include the related client data
      },
    });
  }

  async getEventsWithClient(): Promise<EventWithClient[]> {
    return this.prisma.event.findMany({
      include: {
        venue: true, // Include the related venue data
        client: true, // Include the related client data
        decorItemUsages: {
          include: {
            decorItem: true, // Include the related decor item data
          },
        },
      },
    });
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const currentDate = new Date();

    return this.prisma.event.findMany({
      include: {
        venue: true, // Include the related venue data
        client: true, // Include the related client data
      },
      where: {
        eventdate: {
          gte: currentDate, // Filter out events with dates earlier than the current date
        },
      },
      orderBy: {
        eventdate: 'asc', // Sort by eventdate in ascending order
      },
    });
  }

  async getMetrics(): Promise<EventMetrics> {
    const totalEvents = await this.prisma.event.count();
    const totalPaidAmount = await this.prisma.event.aggregate({
      _sum: {
        paidAmount: true,
      },
    });

    const totalQuoteAmount = await this.prisma.event.aggregate({
      _sum: {
        quoteAmount: true,
      },
    });

    const uniqueVenues = await this.prisma.event.groupBy({
      by: ['venueid'],
      _count: {
        venueid: true,
      },
    });

    const uniqueClients = await this.prisma.event.groupBy({
      by: ['clientid'],
      _count: {
        clientid: true,
      },
    });

    return {
      totalEvents,
      totalPaidAmount: totalPaidAmount._sum.paidAmount?.toNumber() || 0,
      totalQuoteAmount: totalQuoteAmount._sum.quoteAmount?.toNumber() || 0,
      uniqueVenues: uniqueVenues.length,
      uniqueClients: uniqueClients.length,
      eventsByCategory: [{ category: 'BAPTISM', count: 4 }],
    };
  }

  async getEventCategories(): Promise<EventCategory[]> {
    return this.prisma.eventCategory.findMany();
  }

  async getEventById(eventId: number): Promise<Event> {
    if (!eventId) {
      throw new Error('Event ID is required');
    }
    return this.prisma.event.findUnique({
      where: { eventid: eventId },
      include: {
        venue: true,
        client: true,
        decorItemUsages: {
          include: {
            decorItem: true,
          },
        },
      },
    });
  }
}
