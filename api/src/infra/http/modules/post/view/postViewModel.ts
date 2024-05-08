import { MediaPost } from "src/modules/post/entities/mediaPost";
import { TextPost } from "src/modules/post/entities/textPost";

export class TextPostViewModel {
  static toHttp({
    created_at,
    id,
    community_id,
    content,
    title,
    user_id,
  }: TextPost) {
    return {
      created_at,
      id,
      community_id,
      content,
      title,
      user_id,
    };
  }
}

export class MediaPostViewModel {
  static toHttp({
    created_at,
    id,
    community_id,
    media,
    title,
    user_id,
  }: MediaPost) {
    return {
      created_at,
      id,
      community_id,
      media,
      title,
      user_id,
    };
  }
}
