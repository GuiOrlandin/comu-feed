import { Injectable } from "@nestjs/common";

import { PostRepository } from "../repositories/postRepository";
import { PostNotFoundException } from "../exceptions/postNotFoundException";
import { postWithoutPermissionException } from "../exceptions/postWithoutPermissionException";

interface DeletePostRequest {
  post_id: string;
  userId: string;
}

@Injectable()
export class DeletePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute({ post_id, userId }: DeletePostRequest) {
    const post = await this.postRepository.findById(post_id);

    if (!post) {
      throw new PostNotFoundException();
    }

    if (post.user_id !== userId) {
      throw new postWithoutPermissionException({
        actionName: "deletar",
      });
    }

    await this.postRepository.delete(post.id);
  }
}
