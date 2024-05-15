import { Injectable } from "@nestjs/common";
import { CommentRepository } from "../repositories/commentRepository";
import { CommentNotFoundException } from "../exceptions/commentNotFoundException";

interface DeleteCommentInThePostUseCaseRequest {
  comment_id: string;
  user_id: string;
}

@Injectable()
export class DeleteCommentInThePostUseCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute({ comment_id, user_id }: DeleteCommentInThePostUseCaseRequest) {
    const comment = await this.commentRepository.findById(comment_id);

    if (!comment) {
      throw new CommentNotFoundException();
    }

    await this.commentRepository.delete(comment.id, user_id);
  }
}
