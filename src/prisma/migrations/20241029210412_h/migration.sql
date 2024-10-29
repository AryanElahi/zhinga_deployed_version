/*
  Warnings:

  - You are about to drop the column `Uid` on the `Slider` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Slider_Uid_key";

-- AlterTable
ALTER TABLE "Slider" DROP COLUMN "Uid";
