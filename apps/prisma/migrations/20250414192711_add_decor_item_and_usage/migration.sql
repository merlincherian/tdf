-- CreateTable
CREATE TABLE "DecorItem" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DecorItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DecorItemUsage" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "decorItemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "notes" TEXT,

    CONSTRAINT "DecorItemUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DecorItem_name_key" ON "DecorItem"("name");

-- CreateIndex
CREATE INDEX "DecorItemUsage_eventId_idx" ON "DecorItemUsage"("eventId");

-- CreateIndex
CREATE INDEX "DecorItemUsage_decorItemId_idx" ON "DecorItemUsage"("decorItemId");

-- AddForeignKey
ALTER TABLE "DecorItemUsage" ADD CONSTRAINT "DecorItemUsage_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DecorItemUsage" ADD CONSTRAINT "DecorItemUsage_decorItemId_fkey" FOREIGN KEY ("decorItemId") REFERENCES "DecorItem"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
