/*
  Warnings:

  - Changed the type of `frequency` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "lastSentAt" TIMESTAMP(3),
DROP COLUMN "frequency",
ADD COLUMN     "frequency" INTEGER NOT NULL;
