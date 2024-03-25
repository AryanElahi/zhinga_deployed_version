-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL DEFAULT '',
    "username" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL DEFAULT '',
    "countryCode" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL DEFAULT '',
    "Blocked" BOOLEAN NOT NULL DEFAULT false,
    "softDelete" BOOLEAN NOT NULL DEFAULT false,
    "address" TEXT NOT NULL DEFAULT ''
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
