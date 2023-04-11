/*
  Warnings:

  - You are about to drop the column `proCardFrom` on the `Pro_Card` table. All the data in the column will be lost.
  - You are about to drop the column `proCardTo` on the `Pro_Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pro_Card" DROP COLUMN "proCardFrom",
DROP COLUMN "proCardTo",
ADD COLUMN     "from" TIMESTAMP(3),
ADD COLUMN     "to" TIMESTAMP(3);
