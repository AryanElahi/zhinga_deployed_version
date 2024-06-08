-- CreateTable
CREATE TABLE "request" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "lowest_price" DOUBLE PRECISION NOT NULL,
    "hieghest_price" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "Uid" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "request_id_key" ON "request"("id");

-- CreateIndex
CREATE UNIQUE INDEX "request_Uid_key" ON "request"("Uid");
