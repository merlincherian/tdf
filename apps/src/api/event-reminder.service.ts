import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { ApiService } from 'src/api/api.service';
import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EventReminderService {
  constructor(
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    private readonly apiService: ApiService,
  ) {}
  private readonly logger = new Logger();

  // @Cron(CronExpression.EVERY_10_MINUTES)
  async sendEventReminders() {
    console.log('SENDING EVENT REMINDERS>>>');
    const events = await this.apiService.getEvents();
    if (!events || events.length === 0) {
      this.logger.log('No events to process at this time.');
      return; // Exit if there are no events
    }
    await this.emailService.sendEmail({
      to: '96.merlin@gmail.com',
      subject: `Reminder: Your Event is Coming Up!`,
      body: `
      <p>Dear Client,</p>
      <p>This is a friendly reminder about your upcoming event.</p>
      <p>Please ensure that any balance payment is completed before the event as per the contract.</p>
      <p>Your Events Team</p>
      `,
    });
  }

  // async sendPostEventFollowUps() {
  //   console.log('SENDING POST-EVENT FOLLOW-UPS>>>');
  //   const events = await this.apiService.getCompletedEvents();
  //   if (!events || events.length === 0) {
  //     this.logger.log('No completed events to process at this time.');
  //     return;
  //   }

  //   for (const event of events) {
  //     await this.emailService.sendEmail({
  //       to: event.clientEmail,
  //       subject: `Thank You for Attending Your Event!`,
  //       body: `
  //       <p>Dear ${event.clientName},</p>
  //       <p>Thank you for allowing us to be a part of your special event on ${event.date}.</p>
  //       <p>We hope everything went smoothly and met your expectations. If you have any feedback, we would love to hear from you!</p>
  //       <p>Your Events Team</p>
  //       `,
  //     });
  //   }
  // }
}
