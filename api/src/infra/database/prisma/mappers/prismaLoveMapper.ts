import { Love as LoveRaw } from "@prisma/client";
import { Love } from "src/modules/love/entities/love";

export class PrismaLoveMapper {
  static toPrismaLoveWithTextPost({
    id,
    user_id,
    text_post_id,
  }: Love): LoveRaw {
    return {
      id,
      user_id,
      media_post_id: null,
      text_post_id,
    };
  }

  static toPrismaLoveWithMediaPost({
    id,
    user_id,
    media_post_id,
  }: Love): LoveRaw {
    return {
      id,
      user_id,
      media_post_id,
      text_post_id: null,
    };
  }
}
