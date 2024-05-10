import { Injectable } from "@nestjs/common";

import { PostRepository } from "../repositories/postRepository";
import { PostNotFoundException } from "../exceptions/postNotFoundException";

interface UnLoveThePostRequest {
  post_id: string;
}

@Injectable()
export class UnLoveThePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute({ post_id }: UnLoveThePostRequest) {
    const post = await this.postRepository.findById(post_id);

    if (!post) {
      throw new PostNotFoundException();
    }

    if (post.love >= 1) {
      post.love = post.love - 1;
    }

    return post;
  }
}
