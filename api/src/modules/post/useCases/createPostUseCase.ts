import { Injectable } from "@nestjs/common";

import { PostRepository } from "../repositories/postRepository";
import { TextPost } from "../entities/textPost";
import { MediaPost } from "../entities/mediaPost";

interface CreatedPostRequest {
  title: string;
  user_id: string;
  content?: string;
  media?: string;
  community_id: string;
  description?: string;
  postType: "textPost" | "mediaPost";
}

@Injectable()
export class CreatePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute({
    content,
    title,
    user_id,
    community_id,
    postType,
    media,
    description,
  }: CreatedPostRequest) {
    if (postType === "textPost") {
      const post = new TextPost({
        content,
        title,
        user_id,
        community_id,
      });

      await this.postRepository.create(post);
      return post;
    } else {
      const post = new MediaPost({
        media,
        title,
        user_id,
        community_id,
        description,
      });

      await this.postRepository.create(post);
      return post;
    }
  }
}
