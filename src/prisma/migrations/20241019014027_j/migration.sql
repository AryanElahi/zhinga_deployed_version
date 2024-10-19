/*
  Warnings:

  - A unique constraint covering the columns `[Uid]` on the table `visit` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "visit" ALTER COLUMN "Uid" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "visit_Uid_key" ON "visit"("Uid");
