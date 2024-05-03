/*
  Warnings:

  - You are about to drop the column `key_acess` on the `communities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "communities" DROP COLUMN "key_acess",
ADD COLUMN     "key_access" BOOLEAN;
