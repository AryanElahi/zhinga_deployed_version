-- CreateTable
CREATE TABLE "team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "job" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "setting" (
    "id" SERIAL NOT NULL,
    "logo" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "goals" TEXT NOT NULL,
    "teamId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "team_id_key" ON "team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "team_phone_key" ON "team"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "setting_id_key" ON "setting"("id");

-- AddForeignKey
ALTER TABLE "setting" ADD CONSTRAINT "setting_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("phone") ON DELETE RESTRICT ON UPDATE CASCADE;
