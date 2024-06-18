import { MediaPost } from "../entities/mediaPost";
import { TextPost } from "../entities/textPost";

export interface TextPostWithUser {
  id: string;
  title: string;
  user_id: string;
  community_id: string;
  content: string;
  created_at: Date;
  user?: {
    id: string;
    avatar: string;
    created_at: Date;
    email: string;
    name: string;
    password_hash: string;
  };
}

export interface MediaPostWithUser {
  id: string;
  title: string;
  user_id: string;
  community_id: string;
  media: string;
  created_at: Date;
  user?: {
    id: string;
    avatar: string;
    created_at: Date;
    email: string;
    name: string;
    password_hash: string;
  };
}

export abstract class PostRepository {
  abstract create(post: TextPost | MediaPost): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<TextPost | MediaPost | null>;
  abstract findAllPosts(): Promise<(TextPostWithUser | MediaPostWithUser)[]>;
  abstract save(post: TextPost | MediaPost): Promise<void>;
}
