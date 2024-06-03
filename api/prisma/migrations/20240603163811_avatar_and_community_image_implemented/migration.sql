-- AlterTable
ALTER TABLE "communities" ADD COLUMN     "community_image" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT,
ALTER COLUMN "password_hash" DROP NOT NULL;
