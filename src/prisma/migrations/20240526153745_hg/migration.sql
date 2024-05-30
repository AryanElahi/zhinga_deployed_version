/*
  Warnings:

  - You are about to drop the column `Uid` on the `property` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[unifiedId]` on the table `property` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "property_Uid_key";

-- AlterTable
ALTER TABLE "property" DROP COLUMN "Uid",
ADD COLUMN     "unifiedId" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "property_unifiedId_key" ON "property"("unifiedId");
