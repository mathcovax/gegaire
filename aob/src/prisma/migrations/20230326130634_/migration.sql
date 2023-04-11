/*
  Warnings:

  - Added the required column `note` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Availability" ADD COLUMN     "note" VARCHAR(1500) NOT NULL;
