import { Comment as CommentRaw } from "@prisma/client";
import { Comment } from "src/modules/comments/entities/comment";

export class PrismaCommentMapper {
  static toPrismaCommentWithTextPost({
    id,
    user_id,
    text_post_id,
    content,
    created_at,
  }: Comment): CommentRaw {
    return {
      id,
      user_id,
      media_post_id: null,
      text_post_id,
      content,
      created_at,
    };
  }

  static toPrismaCommentWithMediaPost({
    id,
    user_id,
    media_post_id,
    content,
    created_at,
  }: Comment): CommentRaw {
    return {
      id,
      user_id,
      media_post_id,
      text_post_id: null,
      content,
      created_at,
    };
  }
}
