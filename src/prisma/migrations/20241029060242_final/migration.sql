/*
  Warnings:

  - The `loan` column on the `property` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "property" ADD COLUMN     "phone" TEXT NOT NULL DEFAULT 'user ID ',
DROP COLUMN "loan",
ADD COLUMN     "loan" INTEGER NOT NULL DEFAULT 0;
