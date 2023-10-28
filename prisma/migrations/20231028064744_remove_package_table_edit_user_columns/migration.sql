/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `graduatedYear` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `selectedPackageId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subdistrict` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Package` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[runnerNo]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `relationship` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runnerNo` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectedPackage` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RunnerType" AS ENUM ('ALUMNI', 'STUDENT', 'PUBLIC');

-- CreateEnum
CREATE TYPE "PackageType" AS ENUM ('F', 'T');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_selectedPackageId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "country",
DROP COLUMN "district",
DROP COLUMN "graduatedYear",
DROP COLUMN "postalCode",
DROP COLUMN "selectedPackageId",
DROP COLUMN "subdistrict",
ADD COLUMN     "relationship" TEXT NOT NULL,
ADD COLUMN     "runnerNo" TEXT NOT NULL,
ADD COLUMN     "selectedPackage" "PackageType" NOT NULL,
ADD COLUMN     "type" "RunnerType" NOT NULL;

-- DropTable
DROP TABLE "Package";

-- CreateIndex
CREATE UNIQUE INDEX "User_runnerNo_key" ON "User"("runnerNo");
