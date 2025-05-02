import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { Client } from './entities/client.entity';
import { EventReminderService } from 'src/api/event-reminder.service';
import { EmailService } from './email.service';
import { ContractService } from './contract.service';
import { Puppeteer } from 'puppeteer';
import { PuppeteerService } from './puppeteer.service';
import { EventQuoteService } from './event-quote.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [
    ApiService,
    EventReminderService,
    EmailService,
    ContractService,
    PuppeteerService,
    EventQuoteService
  ],
  controllers: [ApiController],
})
export class ApiModule {}
