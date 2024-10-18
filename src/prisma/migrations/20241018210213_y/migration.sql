-- DropForeignKey
ALTER TABLE "property" DROP CONSTRAINT "property_userID_fkey";

-- AlterTable
ALTER TABLE "property" ALTER COLUMN "userID" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("phone") ON DELETE RESTRICT ON UPDATE CASCADE;
