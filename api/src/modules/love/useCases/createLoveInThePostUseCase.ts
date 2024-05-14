import { Injectable } from "@nestjs/common";

import { LoveRepository } from "../repositories/loveRepository";
import { Love } from "../entities/love";
import { AlreadyLovedException } from "../exceptions/alreadyLovedException";

interface CreateLoveInThePostUseCaseRequest {
  user_id: string;
  postType: string;
  media_post_id?: string;
  text_post_id?: string;
}

@Injectable()
export class CreateLoveInThePostUseCase {
  constructor(private loveRepository: LoveRepository) {}

  async execute({
    user_id,
    postType,
    media_post_id,
    text_post_id,
  }: CreateLoveInThePostUseCaseRequest) {
    if (postType === "textPost") {
      const lovedThePost =
        await this.loveRepository.checkUserLikedThePostByUserId(
          user_id,
          text_post_id,
        );

      if (lovedThePost) {
        throw new AlreadyLovedException();
      }

      const love = new Love({
        user_id,
        media_post_id: null,
        text_post_id,
      });

      await this.loveRepository.create(love);
      return love;
    }

    if (postType === "mediaPost") {
      const lovedThePost =
        await this.loveRepository.checkUserLikedThePostByUserId(
          user_id,
          media_post_id,
        );

      if (lovedThePost) {
        throw new AlreadyLovedException();
      }

      const love = new Love({
        user_id,
        media_post_id,
        text_post_id: null,
      });

      await this.loveRepository.create(love);
      return love;
    }
  }
}
