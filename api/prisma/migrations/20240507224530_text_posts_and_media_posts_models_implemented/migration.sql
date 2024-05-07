/*
  Warnings:

  - You are about to drop the column `post_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `media_post_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text_post_id` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_community_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "post_id",
ADD COLUMN     "media_post_id" TEXT NOT NULL,
ADD COLUMN     "text_post_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "posts";

-- CreateTable
CREATE TABLE "text_posts" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "community_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "love" INTEGER,

    CONSTRAINT "text_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_posts" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "community_id" TEXT NOT NULL,
    "media" TEXT NOT NULL,
    "love" INTEGER,

    CONSTRAINT "media_posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "text_posts" ADD CONSTRAINT "text_posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_posts" ADD CONSTRAINT "text_posts_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_posts" ADD CONSTRAINT "media_posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_posts" ADD CONSTRAINT "media_posts_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_text_post_id_fkey" FOREIGN KEY ("text_post_id") REFERENCES "text_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_media_post_id_fkey" FOREIGN KEY ("media_post_id") REFERENCES "media_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
