/*
  Warnings:

  - You are about to drop the `adminproperty` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "property" ADD COLUMN     "loan" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tour3dRequest" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tour3dlink" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "adminproperty";
