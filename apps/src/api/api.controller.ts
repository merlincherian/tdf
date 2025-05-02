import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiService, EventMetrics } from './api.service';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { Venue, Event, EventCategory, Client } from '@prisma/client';
import { Metric } from '@prisma/client/runtime/library';
import { ContractService } from './contract.service';

export type VenueWithEventCount = Venue & {
  eventCount: number;
  distance: number; // Distance in meters
  uHaulEstimate: number;
};

@Controller('api')
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private readonly contractService: ContractService,
  ) {}

  @Post()
  create(@Body() createApiDto: CreateApiDto) {
    return this.apiService.create(createApiDto);
  }

  // @Get()
  // findAll() {
  //   console.log('GGG')
  //   return this.apiService.getData();
  // }

  @Get('upcoming-events')
  getUpcomingEvents(): Promise<Event[]> {
    return this.apiService.getEvents();
  }

  @Get('events')
  getEvents(): Promise<Event[]> {
    return this.apiService.getEvents();
  }

  @Get('clients')
  getClients(): Promise<Client[]> {
    return this.apiService.getClients();
  }

  @Get('venues')
  getVenues(): Promise<VenueWithEventCount[]> {
    return this.apiService.getVenue();
  }

  @Get('event-categories')
  getEventCategories(): Promise<EventCategory[]> {
    console.log('GETTING CATEGORIES');
    return this.apiService.getEventCategories();
  }

  @Get('metrics')
  getMetrics(): Promise<EventMetrics> {
    console.log('GETTING CATEGORIES');
    return this.apiService.getMetrics();
  }

  @Get('contract')
  async getContract(): Promise<void> {

    try {
      await this.contractService.generateContract();
    } catch (error) {
      console.error('Error generating contract:', error);
      throw error; // Re-throw the error if needed
    }
  }

  @Get('events/:eventId')
  getEventById(@Param('eventId') eventId: number): Promise<Event> {
    return this.apiService.getEventById(eventId);
  }
}
