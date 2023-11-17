/*
  Warnings:

  - The values [A_PLUS,A_MINUS,B_PLUS,B_MINUS,O_PLUS,O_MINUS,AB_PLUS,AB_MINUS] on the enum `BloodType` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Counter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `citizenId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `shirtSizeArr` on the `User` table. All the data in the column will be lost.
  - Changed the type of `packageType` on the `Counter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `shirtSize` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `selectedPackage` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BloodType_new" AS ENUM ('A', 'B', 'O', 'AB');
ALTER TABLE "User" ALTER COLUMN "bloodType" TYPE "BloodType_new" USING ("bloodType"::text::"BloodType_new");
ALTER TYPE "BloodType" RENAME TO "BloodType_old";
ALTER TYPE "BloodType_new" RENAME TO "BloodType";
DROP TYPE "BloodType_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RunnerType" ADD VALUE 'VIP';
ALTER TYPE "RunnerType" ADD VALUE 'CHULA';

-- DropIndex
DROP INDEX "User_citizenId_key";

-- AlterTable
ALTER TABLE "Counter" DROP CONSTRAINT "Counter_pkey",
DROP COLUMN "packageType",
ADD COLUMN     "packageType" TEXT NOT NULL,
ADD CONSTRAINT "Counter_pkey" PRIMARY KEY ("packageType");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "citizenId",
DROP COLUMN "nationality",
DROP COLUMN "shirtSizeArr",
ADD COLUMN     "shirtSize" TEXT NOT NULL,
DROP COLUMN "selectedPackage",
ADD COLUMN     "selectedPackage" TEXT NOT NULL;

-- DropEnum
DROP TYPE "PackageType";
