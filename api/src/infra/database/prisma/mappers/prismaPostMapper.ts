import { TextPost as PostRaw } from "@prisma/client";
import { TextPost } from "src/modules/post/entities/textPost";

export class PrismaPostMapper {
  static toPrisma({
    community_id,
    content,
    title,
    user_id,
    created_at,
    id,
    love,
  }: TextPost): PostRaw {
    return {
      community_id,
      content,
      title,
      user_id,
      created_at,
      id,
      love,
    };
  }

  static toDomain({
    community_id,
    content,
    title,
    user_id,
    created_at,
    id,
  }: PostRaw): TextPost {
    return new TextPost({
      community_id,
      content,
      title,
      user_id,
      created_at,
      id,
    });
  }
}
