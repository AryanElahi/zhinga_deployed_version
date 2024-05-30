/*
  Warnings:

  - You are about to drop the column `unifiedId` on the `property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "property" DROP COLUMN "unifiedId",
ADD COLUMN     "state_code" INTEGER NOT NULL DEFAULT 0;
