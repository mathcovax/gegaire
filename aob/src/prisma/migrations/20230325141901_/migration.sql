/*
  Warnings:

  - You are about to drop the column `my` on the `Availability` table. All the data in the column will be lost.
  - Added the required column `month` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "my",
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
