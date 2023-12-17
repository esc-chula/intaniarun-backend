-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bibNumberSent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "receiptSent" BOOLEAN NOT NULL DEFAULT false;
