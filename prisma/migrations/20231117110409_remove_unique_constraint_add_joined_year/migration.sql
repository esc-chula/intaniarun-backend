/*
  Warnings:

  - Added the required column `joinedYear` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_gmail_key";

-- DropIndex
DROP INDEX "User_runnerNo_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "joinedYear" INTEGER NOT NULL;
