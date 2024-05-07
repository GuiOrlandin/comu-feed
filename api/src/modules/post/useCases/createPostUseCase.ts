import { Injectable } from "@nestjs/common";

import { Post } from "../entities/textPost";
import { PostRepository } from "../repositories/postRepository";
import { CommunityRepository } from "src/modules/community/repositories/communityRepository";
import { postWithoutPermissionException } from "../exceptions/postWithoutPermissionException";
import { PostNotFoundException } from "../exceptions/postNotFoundException";

interface CreatedPostRequest {
  title: string;
  user_id: string;
  content: string;
  community_id: string;
}

@Injectable()
export class CreatePostUseCase {
  constructor(
    private postRepository: PostRepository,
    private communityRepository: CommunityRepository,
  ) {}

  async execute({ content, title, user_id, community_id }: CreatedPostRequest) {
    const community = await this.communityRepository.findById(community_id);

    if (!community) {
      throw new PostNotFoundException();
    }

    const userInTheCommunity = community.User_Members.filter(
      (user) => user.id === user_id,
    );

    if (!userInTheCommunity || user_id !== community.founder_id) {
      throw new postWithoutPermissionException({
        actionName: "criar",
      });
    }

    const post = new Post({
      content,
      title,
      user_id,
      community_id,
    });

    await this.postRepository.create(post);

    return post;
  }
}
