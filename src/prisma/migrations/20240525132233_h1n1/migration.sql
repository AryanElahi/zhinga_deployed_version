/*
  Warnings:

  - A unique constraint covering the columns `[Uid]` on the table `property` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "property" ADD COLUMN     "Uid" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "features" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "property_Uid_key" ON "property"("Uid");
