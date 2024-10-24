/*
  Warnings:

  - You are about to drop the column `check` on the `adminproperty` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `adminproperty` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "adminproperty" DROP COLUMN "check",
DROP COLUMN "name";
