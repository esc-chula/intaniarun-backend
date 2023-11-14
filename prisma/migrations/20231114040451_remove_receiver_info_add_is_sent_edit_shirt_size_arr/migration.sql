/*
  Warnings:

  - You are about to drop the column `receiverAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `receiverName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `receiverPhone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `receiverPostalCode` on the `User` table. All the data in the column will be lost.
  - The `shirtSizeArr` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "receiverAddress",
DROP COLUMN "receiverName",
DROP COLUMN "receiverPhone",
DROP COLUMN "receiverPostalCode",
ADD COLUMN     "emailSent" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "shirtSizeArr",
ADD COLUMN     "shirtSizeArr" TEXT[];

-- DropEnum
DROP TYPE "ShirtSize";
