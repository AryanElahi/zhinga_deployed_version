/*
  Warnings:

  - You are about to drop the `Apartement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Apartement";

-- CreateTable
CREATE TABLE "property" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT '',
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
    "phone" TEXT NOT NULL DEFAULT '',
    "price" INTEGER NOT NULL DEFAULT 0,
    "room_number" INTEGER NOT NULL DEFAULT 0,
    "features" TEXT NOT NULL,
    "photo" JSONB NOT NULL,
    "check" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "property_id_key" ON "property"("id");
