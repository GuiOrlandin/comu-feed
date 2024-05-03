/*
  Warnings:

  - The `key_acess` column on the `communities` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "communities" DROP COLUMN "key_acess",
ADD COLUMN     "key_acess" BOOLEAN;
