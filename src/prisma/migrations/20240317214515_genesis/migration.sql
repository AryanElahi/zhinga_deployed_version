-- CreateTable
CREATE TABLE "Apartement" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "land_metrage" INTEGER NOT NULL,
    "useful_metrage" INTEGER NOT NULL,
    "floor_number" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "Unit_in_floor" INTEGER NOT NULL,
    "year_of_build" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "room_number" INTEGER NOT NULL,
    "features" TEXT NOT NULL,
    "photo" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "House" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "land_metrage" INTEGER NOT NULL,
    "useful_metrage" INTEGER NOT NULL,
    "floor_number" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "year_of_build" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "room_number" INTEGER NOT NULL,
    "features" TEXT NOT NULL,
    "photo" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Land" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "land_metrage" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "photo" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Enterprise" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "land_metrage" INTEGER NOT NULL,
    "year_of_build" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "photo" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "AgricultureLand" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "land_metrage" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "photo" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "ServiceLand" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "land_metrage" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "photo" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Nitche" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "land_metrage" INTEGER NOT NULL,
    "useful_metrage" INTEGER NOT NULL,
    "year_of_build" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "photo" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Garden" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "land_metrage" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "photo" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "land_metrage" INTEGER NOT NULL,
    "year_of_build" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "photo" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Apartement_id_key" ON "Apartement"("id");

-- CreateIndex
CREATE UNIQUE INDEX "House_id_key" ON "House"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Land_id_key" ON "Land"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Enterprise_id_key" ON "Enterprise"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AgricultureLand_id_key" ON "AgricultureLand"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceLand_id_key" ON "ServiceLand"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Nitche_id_key" ON "Nitche"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Garden_id_key" ON "Garden"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_id_key" ON "Shop"("id");
