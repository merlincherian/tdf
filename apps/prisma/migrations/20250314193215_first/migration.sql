-- CreateEnum
CREATE TYPE "VenueType" AS ENUM ('CHURCH', 'HALL', 'RESTAURANT', 'HOUSE', 'OTHER');

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(15),
    "address" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,

    CONSTRAINT "EventCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "eventid" SERIAL NOT NULL,
    "clientid" INTEGER,
    "eventdate" DATE,
    "categoryid" INTEGER,
    "guestcount" INTEGER,
    "notes" TEXT,
    "venueid" INTEGER,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eventid")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" "VenueType" NOT NULL,
    "address" TEXT,
    "capacity" INTEGER,
    "notes" TEXT,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EventCategory_name_key" ON "EventCategory"("name");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "EventCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_clientid_fkey" FOREIGN KEY ("clientid") REFERENCES "Client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_venueid_fkey" FOREIGN KEY ("venueid") REFERENCES "Venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
