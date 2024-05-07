import { Injectable } from "@nestjs/common";

import { Post } from "../entities/post";
import { PostRepository } from "../repositories/postRepository";

interface CreatedPostRequest {
  title: string;
  user_id: string;
  content: string;
}

@Injectable()
export class CreatePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute({ content, title, user_id }: CreatedPostRequest) {
    const post = new Post({
      content,
      title,
      user_id,
    });

    await this.postRepository.create(post);

    return post;
  }
}
