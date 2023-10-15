/*
  Warnings:

  - Made the column `selectedPackageId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `paymentId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_selectedPackageId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "graduatedYear" DROP NOT NULL,
ALTER COLUMN "selectedPackageId" SET NOT NULL,
ALTER COLUMN "paymentId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_selectedPackageId_fkey" FOREIGN KEY ("selectedPackageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
