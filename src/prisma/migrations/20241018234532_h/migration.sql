-- CreateTable
CREATE TABLE "visit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "deal" (
    "id" SERIAL NOT NULL,
    "seller" TEXT NOT NULL DEFAULT '',
    "region" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL DEFAULT '',
    "number" TEXT NOT NULL DEFAULT '',
    "client" TEXT NOT NULL DEFAULT '',
    "price" TEXT NOT NULL DEFAULT '',
    "commission" INTEGER NOT NULL DEFAULT 0,
    "date" TEXT NOT NULL DEFAULT '',
    "note" TEXT NOT NULL DEFAULT ''
);

-- CreateIndex
CREATE UNIQUE INDEX "visit_id_key" ON "visit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "deal_id_key" ON "deal"("id");
