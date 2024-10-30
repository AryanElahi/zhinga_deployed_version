/*
  Warnings:

  - You are about to drop the column `logo` on the `setting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "setting" DROP COLUMN "logo",
ADD COLUMN     "photo" JSONB NOT NULL DEFAULT '{}';
