import { Love } from "../entities/love";

export abstract class LoveRepository {
  abstract create(love: Love): Promise<void>;
  abstract checkUserLikedThePostByUserId(
    user_id: string,
    media_post_id?: string,
    text_post_id?: string,
  ): Promise<boolean>;
  abstract findById(love_id: string): Promise<Love | null>;
  abstract delete(love_id: string): Promise<void>;
}
