import { Injectable } from "@nestjs/common";
import { CommentRepository } from "../repositories/commentRepository";
import { Comment } from "../entities/comment";

interface CreateCommentInThePostUseCaseRequest {
  user_id: string;
  content?: string;
  postType: string;
  media_post_id?: string;
  text_post_id?: string;
}

@Injectable()
export class CreateCommentInThePostUseCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute({
    user_id,
    postType,
    media_post_id,
    text_post_id,
    content,
  }: CreateCommentInThePostUseCaseRequest) {
    if (postType === "textPost") {
      const comment = new Comment({
        user_id,
        media_post_id: null,
        text_post_id,
        content,
      });

      await this.commentRepository.create(comment);
      return comment;
    }

    if (postType === "mediaPost") {
      const comment = new Comment({
        user_id,
        media_post_id,
        text_post_id: null,
        content,
      });

      await this.commentRepository.create(comment);

      return comment;
    }
  }
}
