/*
  Warnings:

  - You are about to drop the column `love` on the `communities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "communities" DROP COLUMN "love";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "love" INTEGER;
