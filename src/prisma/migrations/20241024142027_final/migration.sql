/*
  Warnings:

  - You are about to drop the column `phone` on the `adminproperty` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "adminproperty" DROP COLUMN "phone",
ADD COLUMN     "number" TEXT NOT NULL DEFAULT '';
