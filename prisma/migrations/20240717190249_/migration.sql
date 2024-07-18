/*
  Warnings:

  - You are about to drop the column `teamId` on the `User` table. All the data in the column will be lost.
  - Changed the type of `otp` on the `OTP` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamId_fkey";

-- AlterTable
ALTER TABLE "OTP" DROP COLUMN "otp",
ADD COLUMN     "otp" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "teamId";
