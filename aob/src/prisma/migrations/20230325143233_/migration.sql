/*
  Warnings:

  - You are about to drop the column `activityId` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `am` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `leader` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `pm` on the `Work` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Work" DROP CONSTRAINT "Work_activityId_fkey";

-- AlterTable
ALTER TABLE "Work" DROP COLUMN "activityId",
DROP COLUMN "am",
DROP COLUMN "leader",
DROP COLUMN "pm",
ADD COLUMN     "amActivityId" INTEGER,
ADD COLUMN     "amLeader" BOOLEAN,
ADD COLUMN     "pmActivityId" INTEGER,
ADD COLUMN     "pmLeader" BOOLEAN;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_amActivityId_fkey" FOREIGN KEY ("amActivityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_pmActivityId_fkey" FOREIGN KEY ("pmActivityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
