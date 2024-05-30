/*
  Warnings:

  - A unique constraint covering the columns `[state_code]` on the table `property` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "property" ALTER COLUMN "state_code" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "property_state_code_key" ON "property"("state_code");
