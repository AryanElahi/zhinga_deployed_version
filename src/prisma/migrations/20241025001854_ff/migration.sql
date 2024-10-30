/*
  Warnings:

  - You are about to drop the column `photo` on the `adminproperty` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "adminproperty" DROP COLUMN "photo",
ADD COLUMN     "images" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "property" DROP COLUMN "photo",
ADD COLUMN     "images" TEXT NOT NULL DEFAULT '';
