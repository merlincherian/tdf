import { Injectable } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service'; // Create this service
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiService } from './api.service';
import e from 'express';
import { EventQuoteService } from './event-quote.service';

export interface ContractData {
  clientName: string;
  clientAddress: string;
  clientContact: string;
  eventName?: string; //  Optional event details
  eventDate?: string;
  eventLocation?: string;
  [key: string]: any; // Allow other properties
}

@Injectable()
export class ContractService {
  constructor(
    private readonly puppeteerService: PuppeteerService,
    private readonly apiService: ApiService,
    private readonly eventQuoteService: EventQuoteService,
  ) {}

  //   @Cron(CronExpression.EVERY_10_SECONDS)
  async generateContract(): Promise<Buffer> {
    try {
      const events = await this.apiService.getEventsWithClient();
      console.log('Events:', events);
      const event = events[0];
      const items = event.decorItemUsages;
      console.log('Items:', items);
      const quote = await this.eventQuoteService.calculateEventQuote(
        event.eventid,
      );

      // Assuming you have an event name from the fetched events
      const client = event.client;

      let htmlContent = `
      <!doctype html>
      <html>
      <head>
          <title>Contract</title>
          <style>
              @page {
                  margin: 10mm;
              }
              body {
                  font-family: Arial, sans-serif;
                  margin: 10px;
              }
              .header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 20px;
                  background-color: #6d0d0d;
                  border-bottom: 1px solid #ddd;
                  color: white;
              }
              .business-info {
                  position: absolute;
                  text-align: left;
                  width: 200px;
                  background-color: #6d0d0d;
                  border-radius: 5px;
                  color: white;
              }
              .container {
                  max-width: 800px;
                  margin: 0 auto;
                  padding: 20px;
                  border-radius: 10px;
              }
              h1 {
                  text-align: center;
                  color: #333;
              }
              h2 {
                  color: #555;
              }
              p {
                  margin-bottom: 10px;
                  line-height: 1.5;
              }
              .client-info {
                  display: flex;
                  justify-content: space-between;
                  gap: 20px;
                  margin-top: 20px;
                  border: 1px solid #ddd;
                  padding: 15px;
                  border-radius: 5px;
                  background-color: #f9f9f9;
              }
              .footer {
                  text-align: center;
                  margin-top: 30px;
                  font-size: 0.9em;
                  color: #888;
              }
          </style>
      </head>
      <body>
          <header class="header">
              <img src="your-logo.png" alt="Business Logo" class="logo" />
              <div class="business-info">
                  <div class="business-name">The Decor Factory</div>
                  <div class="address">decorfactorybyfm@gmail.com</div>
              </div>
          </header>
          <div class="container">
              <h1>Event Contract</h1>
              <p>This contract is between The Decor Factory and ${client.name}</p>
      
              <div class="client-info">
                  <div>
                      <p><strong>Name:</strong> ${client.name}</p>
                      <p><strong>Address:</strong> ${client.address}</p>
                  </div>
                  <div>
                      <p><strong>Email:</strong> ${client.email}</p>
                      <p><strong>Contact:</strong> ${client.phone_number}</p>
                  </div>
              </div>
      
              <h2>EVENT DETAILS</h2>
              <div class="event-info">
                  <p><strong>Name:</strong> ${event.name}</p>
                  <p><strong>Address:</strong>${event.venueid}</p>
              </div>
      
              <h2>DECOR DETAILS</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                  <thead>
                    <tr style="background-color: #f2f2f2; text-align: left;">
                      <th style="border: 1px solid #ddd; padding: 8px;">Item</th>
                      <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
                      <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
                      <th style="border: 1px solid #ddd; padding: 8px;">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                  ${items
                    .map((item) => {
                      const cost =
                        item.decorItem.unitPrice.toNumber() * item.quantity;
                      return `
                      <tr>
                        <td style="border: 1px solid #ddd; padding: 8px;">${item.decorItem.name}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${item.decorItem.description}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">$${cost}</td>
                      </tr>
                    `;
                    })
                    .join('')}
                    <tr>
                      <td style="border: 1px solid #ddd; padding: 8px;" colspan="3" align="right"><strong>Total</strong></td>
                      <td style="border: 1px solid #ddd; padding: 8px;"><strong>$${quote}</strong></td>
                    </tr>
                  </tbody>
                </table>
      
              <h2>CLIENT RESPONSIBILITIES</h2>
              <p>
              <ul>
                  <li>Client agrees to provide Company with access to the event location at the agreed-upon times for setup and takedown.</li>
                  <li>Client is responsible for obtaining any necessary permits or approvals for the decor at the event location.</li>
                  <li>Client agrees to provide a safe and suitable environment for the decor setup and takedown.</li>
                  <li>Client is responsible for providing Company with accurate event details and any changes in a timely manner.</li>
                  <li>Client is responsible for the security of the decor items during the event.</li>
              </ul>
              </p>
              <h2>TERMS AND CONDITIONS.</h2>
              <p>
                  All items are rental unless otherwise indicated with the exception of
                  fresh flowers. If the client wishes to cancel the services, he/she must
                  give the decorators at least 21 days notice. Any cancellation after that
                  point will result in a 50% cancellation charge.
              </p>
              <p>
                  A $300.00 non-refundable deposit to secure the date will be required
                  upon submission of this contract for the contract to be considered
                  valid. The balance must be paid in full two weeks prior to the event.
                  Payments may be made via cash, check, or Venmo to Merlin Cherian or
                  Febin Steve Jose.
              </p>
              <h2>FORCE MAJUERE</h2>
              <p>Notwithstanding anything to the contrary contained herein, the parties shall not be
                  liable for any delays or failures in performance resulting from acts beyond its
                  reasonable control including, without limitation, acts of God, terrorist acts, shortage of
                  supply, breakdowns or malfunctions, interruptions or malfunction of computer facilities,
                  or loss of data due to power failures or mechanical diﬃculties with information storage
                  or retrieval systems, labor diﬃculties, war, or civil unrest.
              </p>
      
              <h2>ACCEPTANCE OF TERMS</h2>
              <p>By signing below, both Parties acknowledge that they have read, understood, and agree to be bound by the terms and conditions of this contract. </p>
      
              <h2>SIGNATURES</h2>
              <div>
                  <p><strong>Client Name:</strong> <span style="border-bottom: 1px solid black; display: inline-block; width: 200px; height: 20px;"></span></p>
                  <p><strong>Client Phone Number:</strong> <span style="border-bottom: 1px solid black; display: inline-block; width: 200px; height: 20px;"></span></p>
                  <p><strong>Client Email:</strong> <span style="border-bottom: 1px solid black; display: inline-block; width: 200px; height: 20px;"></span></p>
              </div>
              <div>
                  <p><strong>Client Name:</strong> <span style="border-bottom: 1px solid black; display: inline-block; width: 200px; height: 20px;"></span></p>
                  <p><strong>Client Phone Number:</strong> <span style="border-bottom: 1px solid black; display: inline-block; width: 200px; height: 20px;"></span></p>
                  <p><strong>Client Email:</strong> <span style="border-bottom: 1px solid black; display: inline-block; width: 200px; height: 20px;"></span></p>
              </div>
      
              <div class="footer">
                  <p>Contract Generated on: {{currentDate}}</p>
              </div>
          </div>
      </body>
      </html>
      `;

      const pdfBuffer = await this.puppeteerService.generatePdf(htmlContent);
      console.log('PDF generated successfully', pdfBuffer);
      return pdfBuffer;
    } catch (error) {
      throw new Error(`Failed to generate contract PDF: ${error.message}`);
    }
  }
}
