/*
  Warnings:

  - You are about to drop the column `photo` on the `setting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "setting" DROP COLUMN "photo",
ADD COLUMN     "logo" JSONB NOT NULL DEFAULT '{}';
