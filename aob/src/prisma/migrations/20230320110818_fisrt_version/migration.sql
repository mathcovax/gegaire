/*
  Warnings:

  - You are about to drop the column `addressLat` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `addressLng` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `addressPostcode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `addressText` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `adressCity` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `proCardFrom` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `proCardTo` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "addressLat",
DROP COLUMN "addressLng",
DROP COLUMN "addressPostcode",
DROP COLUMN "addressText",
DROP COLUMN "adressCity",
DROP COLUMN "proCardFrom",
DROP COLUMN "proCardTo";

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "activityId" INTEGER,
    "userId" INTEGER,
    "postCode" VARCHAR(6) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pro_Card" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "proCardFrom" TIMESTAMP(3),
    "proCardTo" TIMESTAMP(3),

    CONSTRAINT "Pro_Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Availability" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "my" VARCHAR(7) NOT NULL,
    "day" INTEGER NOT NULL,
    "am" BOOLEAN,
    "pm" BOOLEAN,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
    "id" SERIAL NOT NULL,
    "availabilityId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "am" BOOLEAN,
    "pm" BOOLEAN,
    "leader" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "number" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hourStart" VARCHAR(5) NOT NULL,
    "hourEnd" VARCHAR(5) NOT NULL,
    "note" VARCHAR(1500) NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_activityId_key" ON "Address"("activityId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Pro_Card_userId_key" ON "Pro_Card"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Work_availabilityId_key" ON "Work"("availabilityId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pro_Card" ADD CONSTRAINT "Pro_Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
