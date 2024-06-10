-- CreateTable
CREATE TABLE "visitor" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "ip" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "visitor_id_key" ON "visitor"("id");
