import { MediaPost } from "../entities/mediaPost";
import { TextPost } from "../entities/textPost";

export abstract class PostRepository {
  abstract create(post: TextPost | MediaPost): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<TextPost | MediaPost | null>;
  abstract save(post: TextPost | MediaPost): Promise<void>;
}
