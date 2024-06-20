import { Injectable } from "@nestjs/common";

import { PostRepository } from "../repositories/postRepository";
import { PostNotFoundException } from "../exceptions/postNotFoundException";

interface FindPostByIdRequest {
  id: string;
}

@Injectable()
export class FindPostByIdUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute({ id }: FindPostByIdRequest) {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new PostNotFoundException();
    }

    return post;
  }
}
