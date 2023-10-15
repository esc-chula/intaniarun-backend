-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A_PLUS', 'A_MINUS', 'B_PLUS', 'B_MINUS', 'O_PLUS', 'O_MINUS', 'AB_PLUS', 'AB_MINUS');

-- CreateEnum
CREATE TYPE "ShirtSize" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "citizenId" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "graduatedYear" INTEGER NOT NULL,
    "shirtSize" "ShirtSize" NOT NULL,
    "address" TEXT NOT NULL,
    "subdistrict" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "disease" TEXT NOT NULL,
    "bloodType" "BloodType" NOT NULL,
    "emergencyName" TEXT NOT NULL,
    "emergencyPhone" TEXT NOT NULL,
    "referredStudentId" TEXT,
    "gmail" TEXT,
    "selectedPackageId" INTEGER,
    "paymentId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "items" TEXT[],

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_citizenId_key" ON "User"("citizenId");

-- CreateIndex
CREATE UNIQUE INDEX "User_referredStudentId_key" ON "User"("referredStudentId");

-- CreateIndex
CREATE UNIQUE INDEX "User_gmail_key" ON "User"("gmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_paymentId_key" ON "User"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "User_firstName_lastName_key" ON "User"("firstName", "lastName");

-- CreateIndex
CREATE UNIQUE INDEX "Package_name_key" ON "Package"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_selectedPackageId_fkey" FOREIGN KEY ("selectedPackageId") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;
