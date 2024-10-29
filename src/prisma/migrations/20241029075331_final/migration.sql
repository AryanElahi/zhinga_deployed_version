-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "Blocked" BOOLEAN NOT NULL DEFAULT false,
    "phoneVarify" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "property" (
    "id" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "tour3dRequest" BOOLEAN NOT NULL DEFAULT false,
    "tour3dlink" TEXT NOT NULL DEFAULT '',
    "loan" INTEGER NOT NULL DEFAULT 0,
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
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "room_number" INTEGER NOT NULL DEFAULT 0,
    "features" TEXT NOT NULL DEFAULT '',
    "photo" JSONB NOT NULL DEFAULT '{}',
    "phone" TEXT NOT NULL DEFAULT 'user ID ',
    "check" BOOLEAN NOT NULL DEFAULT false,
    "state_code" TEXT NOT NULL DEFAULT '',
    "Uid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "request" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "region" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL DEFAULT '',
    "lowest_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "hieghest_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "location" TEXT NOT NULL DEFAULT '',
    "message" TEXT NOT NULL DEFAULT '',
    "status" BOOLEAN NOT NULL DEFAULT false,
    "check" BOOLEAN NOT NULL DEFAULT false,
    "Uid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "visit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "date" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "Uid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "deal" (
    "id" SERIAL NOT NULL,
    "seller" TEXT NOT NULL DEFAULT '',
    "region" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL DEFAULT '',
    "number" TEXT NOT NULL DEFAULT '',
    "client" TEXT NOT NULL DEFAULT '',
    "price" INTEGER NOT NULL DEFAULT 0,
    "commission" INTEGER NOT NULL DEFAULT 0,
    "date" TEXT NOT NULL DEFAULT '',
    "note" TEXT NOT NULL DEFAULT '',
    "Uid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "visitor" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "ip" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "property_id_key" ON "property"("id");

-- CreateIndex
CREATE UNIQUE INDEX "property_Uid_key" ON "property"("Uid");

-- CreateIndex
CREATE UNIQUE INDEX "request_id_key" ON "request"("id");

-- CreateIndex
CREATE UNIQUE INDEX "request_Uid_key" ON "request"("Uid");

-- CreateIndex
CREATE UNIQUE INDEX "visit_id_key" ON "visit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "visit_Uid_key" ON "visit"("Uid");

-- CreateIndex
CREATE UNIQUE INDEX "deal_id_key" ON "deal"("id");

-- CreateIndex
CREATE UNIQUE INDEX "deal_Uid_key" ON "deal"("Uid");

-- CreateIndex
CREATE UNIQUE INDEX "visitor_id_key" ON "visitor"("id");

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("phone") ON DELETE RESTRICT ON UPDATE CASCADE;
