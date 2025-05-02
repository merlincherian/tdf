import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class EventQuoteService {
  private prisma = new PrismaClient();
  async calculateEventQuote(eventId: number): Promise<Decimal> {
    try {
      const decorItemUsages = await this.prisma.decorItemUsage.findMany({
        where: {
          eventId: eventId,
        },
        include: {
          decorItem: true,
        },
      });

      let totalQuote = new Decimal(0);

      for (const usage of decorItemUsages) {
        console.log('Decor Item Usage:', usage);
        if (usage.decorItem && usage.decorItem.unitPrice && usage.quantity) {
          const itemCost = usage.decorItem.unitPrice.mul(usage.quantity);
          totalQuote = totalQuote.add(itemCost);
        }
      }

      // You might want to add other event-related costs here
      // (e.g., venue fees, service charges) by fetching the Event
      // and including those fields in your calculation.

      return totalQuote;
    } catch (error) {
      console.error('Error calculating event quote:', error);
      throw new Error('Failed to calculate event quote.');
    }
  }
}
