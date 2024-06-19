import { MediaPost } from "../entities/mediaPost";
import { TextPost } from "../entities/textPost";

export interface CommentWithUser {
  content: string;
  user: {
    avatar: string;
    email: string;
    name: string;
  };
  created_at: Date;
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
  comments?: CommentWithUser[];
  community?: {
    name: string;
  };
}

export abstract class PostRepository {
  abstract create(post: TextPost | MediaPost): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<TextPost | MediaPost | null>;
  abstract findAllPosts(): Promise<(TextPostWithUser | MediaPostWithUser)[]>;
  abstract save(post: TextPost | MediaPost): Promise<void>;
}
