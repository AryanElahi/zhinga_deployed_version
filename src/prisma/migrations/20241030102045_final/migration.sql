/*
  Warnings:

  - You are about to drop the column `teamId` on the `setting` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "setting" DROP CONSTRAINT "setting_teamId_fkey";

-- AlterTable
ALTER TABLE "setting" DROP COLUMN "teamId";
