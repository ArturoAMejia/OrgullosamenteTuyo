/*
  Warnings:

  - Added the required column `week` to the `Questionary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questionary" ADD COLUMN     "week" INTEGER NOT NULL;
