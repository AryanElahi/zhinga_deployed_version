/*
  Warnings:

  - A unique constraint covering the columns `[Uid]` on the table `Slider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Uid` to the `Slider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Slider" ADD COLUMN     "Uid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Slider_Uid_key" ON "Slider"("Uid");
