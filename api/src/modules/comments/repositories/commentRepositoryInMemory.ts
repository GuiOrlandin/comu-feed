import { Comment } from "../entities/comment";
import { CommentRepository } from "./commentRepository";
import { UserNotAuthorizedException } from "../exceptions/userNotAuthorizedException";

export class CommentRepositoryInMemory implements CommentRepository {
  public comments: Comment[] = [];

  async findById(id: string): Promise<Comment | null> {
    const comment = this.comments.find((comment) => comment.id === id);

    if (!comment) {
      return null;
    }

    return comment;
  }

  async delete(comment_id: string, user_id: string): Promise<void> {
    const user = this.comments.filter((comment) => comment.user_id === user_id);

    if (!user) {
      throw new UserNotAuthorizedException();
    }

    this.comments = this.comments.filter(
      (comment) => comment.id !== comment_id,
    );
  }

  async create(comment: Comment): Promise<void> {
    this.comments.push(comment);
  }
}
