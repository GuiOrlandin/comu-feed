import { Comment } from "../entities/comment";

export abstract class CommentRepository {
  abstract create(comment: Comment): Promise<void>;
  abstract delete(comment_id: string, user_id: string): Promise<void>;
  abstract findById(id: string): Promise<Comment | null>;
}
