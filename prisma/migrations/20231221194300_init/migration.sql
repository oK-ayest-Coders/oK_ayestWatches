/*
  Warnings:

  - You are about to drop the column `craftDate` on the `Watches` table. All the data in the column will be lost.
  - Added the required column `craftdate` to the `Watches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Watches" DROP COLUMN "craftDate",
ADD COLUMN     "craftdate" TEXT NOT NULL;
