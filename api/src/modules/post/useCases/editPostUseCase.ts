import { Injectable, NotFoundException } from "@nestjs/common";

import { PostRepository } from "../repositories/postRepository";
import { PostNotFoundException } from "../exceptions/postNotFoundException";
import { postWithoutPermissionException } from "../exceptions/postWithoutPermissionException";

interface EditPostRequest {
  content: string | File;
  title: string;
  user_id: string;
  post_id: string;
}

@Injectable()
export class EditPostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute({ post_id, content, user_id, title }: EditPostRequest) {
    const post = await this.postRepository.findById(post_id);

    if (!post) {
      throw new PostNotFoundException();
    }

    if (user_id !== post.user_id) {
      throw new postWithoutPermissionException({
        actionName: "editar",
      });
    }

    post.content = content;
    post.title = title;

    await this.postRepository.save(post);

    return post;
  }
}
