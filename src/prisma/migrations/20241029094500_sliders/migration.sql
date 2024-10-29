-- CreateTable
CREATE TABLE "Slider" (
    "id" SERIAL NOT NULL,
    "photo" JSONB NOT NULL DEFAULT '{}',
    "Title" TEXT NOT NULL DEFAULT '',
    "note" TEXT NOT NULL DEFAULT ''
);

-- CreateIndex
CREATE UNIQUE INDEX "Slider_id_key" ON "Slider"("id");
