/*
  Warnings:

  - You are about to drop the column `number` on the `adminproperty` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "adminproperty" DROP COLUMN "number",
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '';
