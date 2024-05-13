/*
  Warnings:

  - You are about to drop the column `love` on the `media_posts` table. All the data in the column will be lost.
  - You are about to drop the column `love` on the `text_posts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_media_post_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_text_post_id_fkey";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "media_post_id" DROP NOT NULL,
ALTER COLUMN "text_post_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "media_posts" DROP COLUMN "love";

-- AlterTable
ALTER TABLE "text_posts" DROP COLUMN "love";

-- CreateTable
CREATE TABLE "love" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "text_post_id" TEXT,
    "media_post_id" TEXT,

    CONSTRAINT "love_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "love" ADD CONSTRAINT "love_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "love" ADD CONSTRAINT "love_text_post_id_fkey" FOREIGN KEY ("text_post_id") REFERENCES "text_posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "love" ADD CONSTRAINT "love_media_post_id_fkey" FOREIGN KEY ("media_post_id") REFERENCES "media_posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_text_post_id_fkey" FOREIGN KEY ("text_post_id") REFERENCES "text_posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_media_post_id_fkey" FOREIGN KEY ("media_post_id") REFERENCES "media_posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
