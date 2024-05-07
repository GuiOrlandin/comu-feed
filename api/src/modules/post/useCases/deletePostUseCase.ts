import { Injectable, NotFoundException } from "@nestjs/common";

import { PostRepository } from "../repositories/postRepository";

interface DeletePostRequest {
  post_id: string;
}

@Injectable()
export class DeletePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute({ post_id }: DeletePostRequest) {
    const post = await this.postRepository.findById(post_id);

    if (!post) {
      throw new NotFoundException();
    }

    await this.postRepository.delete(post.id);
  }
}
