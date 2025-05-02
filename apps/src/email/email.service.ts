// import { Cron, CronExpression } from '@nestjs/schedule';
// import axios from 'axios';
// import { ApiService } from 'src/api/api.service';
// import { Injectable, Logger } from '@nestjs/common';

// @Injectable()
// export class EmailService {
//   constructor(private readonly apiService: ApiService) {}
//   private readonly logger = new Logger();

//   @Cron(CronExpression.EVERY_10_MINUTES)
//   async sendEventReminders() {
//     console.log("SENDING EVENT REMINDERS");
//     const events = await this.apiService.getEvents();
//     if (!events || events.length === 0) {
//       this.logger.log('No events to process at this time.');
//       return; // Exit if there are no events
//     }

//   }
 
// }