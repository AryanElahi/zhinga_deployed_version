/*
  Warnings:

  - Added the required column `date` to the `visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visit" ADD COLUMN     "date" TEXT NOT NULL;
