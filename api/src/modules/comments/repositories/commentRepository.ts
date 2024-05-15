import { Comment } from "../entities/comment";

export abstract class CommentRepository {
  abstract create(comment: Comment): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Comment | null>;
}
