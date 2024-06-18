import { Injectable } from "@nestjs/common";

import { PostRepository } from "../repositories/postRepository";

@Injectable()
export class FindAllPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute() {
    const allPosts = await this.postRepository.findAllPosts();

    return allPosts;
  }
}
