/*
  Warnings:

  - You are about to drop the `AgricultureLand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Enterprise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Garden` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `House` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Land` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nitche` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceLand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Apartement" ADD COLUMN     "type" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "region" SET DEFAULT '',
ALTER COLUMN "address" SET DEFAULT '',
ALTER COLUMN "location" SET DEFAULT '',
ALTER COLUMN "usage" SET DEFAULT '',
ALTER COLUMN "document_type" SET DEFAULT '',
ALTER COLUMN "land_metrage" SET DEFAULT 0,
ALTER COLUMN "useful_metrage" SET DEFAULT 0,
ALTER COLUMN "floor_number" SET DEFAULT 0,
ALTER COLUMN "floor" SET DEFAULT 0,
ALTER COLUMN "Unit_in_floor" SET DEFAULT 0,
ALTER COLUMN "year_of_build" SET DEFAULT 0,
ALTER COLUMN "full_name" SET DEFAULT '',
ALTER COLUMN "phone" SET DEFAULT '',
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "room_number" SET DEFAULT 0;

-- DropTable
DROP TABLE "AgricultureLand";

-- DropTable
DROP TABLE "Enterprise";

-- DropTable
DROP TABLE "Garden";

-- DropTable
DROP TABLE "House";

-- DropTable
DROP TABLE "Land";

-- DropTable
DROP TABLE "Nitche";

-- DropTable
DROP TABLE "ServiceLand";

-- DropTable
DROP TABLE "Shop";
