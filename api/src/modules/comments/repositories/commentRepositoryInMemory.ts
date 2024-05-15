import { Comment } from "../entities/comment";
import { CommentRepository } from "./commentRepository";

export class CommentRepositoryInMemory implements CommentRepository {
  public comments: Comment[] = [];

  async findById(id: string): Promise<Comment | null> {
    const comment = this.comments.find((comment) => comment.id === id);

    if (!comment) {
      return null;
    }

    return comment;
  }

  async delete(id: string): Promise<void> {
    this.comments = this.comments.filter((comment) => comment.id !== id);
  }

  async create(comment: Comment): Promise<void> {
    this.comments.push(comment);
  }
}
