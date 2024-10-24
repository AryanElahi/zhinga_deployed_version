/*
  Warnings:

  - You are about to drop the column `phone` on the `property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "property" DROP COLUMN "phone";

-- CreateTable
CREATE TABLE "adminproperty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "tour3dRequest" BOOLEAN NOT NULL DEFAULT false,
    "tour3dlink" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL DEFAULT '',
    "loan" BOOLEAN NOT NULL DEFAULT false,
    "region" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL DEFAULT '',
    "usage" TEXT NOT NULL DEFAULT '',
    "document_type" TEXT NOT NULL DEFAULT '',
    "land_metrage" INTEGER NOT NULL DEFAULT 0,
    "useful_metrage" INTEGER NOT NULL DEFAULT 0,
    "floor_number" INTEGER NOT NULL DEFAULT 0,
    "floor" INTEGER NOT NULL DEFAULT 0,
    "Unit_in_floor" INTEGER NOT NULL DEFAULT 0,
    "year_of_build" INTEGER NOT NULL DEFAULT 0,
    "full_name" TEXT NOT NULL DEFAULT '',
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "room_number" INTEGER NOT NULL DEFAULT 0,
    "features" TEXT NOT NULL DEFAULT '',
    "photo" JSONB NOT NULL DEFAULT '{}',
    "check" BOOLEAN NOT NULL DEFAULT false,
    "softDelete" BOOLEAN NOT NULL DEFAULT false,
    "state_code" TEXT NOT NULL DEFAULT '',
    "Uid" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "adminproperty_id_key" ON "adminproperty"("id");

-- CreateIndex
CREATE UNIQUE INDEX "adminproperty_Uid_key" ON "adminproperty"("Uid");
