-- CreateTable
CREATE TABLE "region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "ip" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "region_id_key" ON "region"("id");
