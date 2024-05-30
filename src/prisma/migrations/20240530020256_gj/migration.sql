/*
  Warnings:

  - A unique constraint covering the columns `[Uid]` on the table `property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Uid` to the `property` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "property_state_code_key";

-- AlterTable
ALTER TABLE "property" ADD COLUMN     "Uid" TEXT NOT NULL,
ALTER COLUMN "state_code" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "property_Uid_key" ON "property"("Uid");
