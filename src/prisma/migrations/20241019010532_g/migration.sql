/*
  Warnings:

  - Added the required column `address` to the `visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visit" ADD COLUMN     "address" TEXT NOT NULL;
