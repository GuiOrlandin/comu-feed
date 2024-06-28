import { MediaPost } from "../entities/mediaPost";
import { TextPost } from "../entities/textPost";

export interface CommentWithUser {
  content: string;
  id: string;
  user: {
    id: string;
    avatar: string;
    email: string;
    name: string;
  };
  created_at: Date;
}
export interface LoveWithUser {
  id: string;
  text_post_id?: string;
  media_post_id?: string;
  user: {
    avatar: string;
    name: string;
    id: string;
  };
}

export interface TextPostWithUser {
  id: string;
  title: string;
  user_id: string;
  community_id: string;
  content: string;
  created_at: Date;
  user?: {
    avatar: string;
    email: string;
    name: string;
  };
  love?: LoveWithUser[];
  comments?: CommentWithUser[];
  community?: {
    name: string;
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
    avatar: string;
    email: string;
    name: string;
  };
  love?: LoveWithUser[];
  comments?: CommentWithUser[];
  community?: {
    name: string;
  };
}

export abstract class PostRepository {
  abstract create(post: TextPost | MediaPost): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(
    id: string,
  ): Promise<TextPostWithUser | MediaPostWithUser | null>;
  abstract findAllPosts(): Promise<(TextPostWithUser | MediaPostWithUser)[]>;
  abstract save(post: TextPost | MediaPost): Promise<void>;
}
