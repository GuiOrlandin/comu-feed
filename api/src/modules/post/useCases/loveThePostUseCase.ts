import { Injectable } from "@nestjs/common";

import { PostRepository } from "../repositories/postRepository";
import { PostNotFoundException } from "../exceptions/postNotFoundException";

interface LoveThePostRequest {
  post_id: string;
}

@Injectable()
export class LoveThePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute({ post_id }: LoveThePostRequest) {
    const post = await this.postRepository.findById(post_id);

    if (!post) {
      throw new PostNotFoundException();
    }

    post.love = post.love + 1;

    return post;
  }
}
