import { TextPost as TextPostRaw } from "@prisma/client";
import { MediaPost as MediaPostRaw } from "@prisma/client";
import { MediaPost } from "src/modules/post/entities/mediaPost";
import { TextPost } from "src/modules/post/entities/textPost";

export class PrismaPostMapper {
  static toPrismaTextPost({
    community_id,
    content,
    title,
    user_id,
    created_at,
    id,
    love,
  }: TextPost): TextPostRaw {
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

  static toPrismaMediaPost({
    community_id,
    media,
    title,
    user_id,
    created_at,
    id,
    love,
  }: MediaPost): MediaPostRaw {
    return {
      community_id,
      media,
      title,
      user_id,
      created_at,
      id,
      love,
    };
  }

  static toDomainTextPost({
    community_id,
    content,
    title,
    user_id,
    created_at,
    id,
  }: TextPostRaw): TextPost {
    return new TextPost({
      community_id,
      content,
      title,
      user_id,
      created_at,
      id,
    });
  }

  static toDomainMediaPost({
    community_id,
    media,
    title,
    user_id,
    created_at,
    id,
  }: MediaPostRaw): MediaPost {
    return new MediaPost({
      community_id,
      media,
      title,
      user_id,
      created_at,
      id,
    });
  }
}
