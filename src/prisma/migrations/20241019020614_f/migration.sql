/*
  Warnings:

  - A unique constraint covering the columns `[Uid]` on the table `deal` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "deal" ALTER COLUMN "Uid" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "deal_Uid_key" ON "deal"("Uid");
