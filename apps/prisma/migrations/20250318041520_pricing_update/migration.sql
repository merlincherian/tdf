-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "expenseAmount" DECIMAL(10,2),
ADD COLUMN     "paidAmount" DECIMAL(10,2),
ADD COLUMN     "quoteAmount" DECIMAL(10,2);
