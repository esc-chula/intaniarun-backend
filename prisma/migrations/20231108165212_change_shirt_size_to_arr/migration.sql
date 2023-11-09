/*
  Warnings:

  - You are about to drop the column `shirtSize` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "shirtSize",
ADD COLUMN     "shirtSizeArr" "ShirtSize"[];
