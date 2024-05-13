import { Injectable } from "@nestjs/common";

import { LoveRepository } from "../repositories/loveRepository";
import { Love } from "../entities/love";

interface CreateLoveInThePostUseCaseRequest {
  post_id: string;
  user_id: string;
}

@Injectable()
export class CreateLoveInThePostUseCase {
  constructor(private loveRepository: LoveRepository) {}

  async execute({ post_id, user_id }: CreateLoveInThePostUseCaseRequest) {
    const lovedThePost =
      await this.loveRepository.checkUserLikedThePostByUserId(user_id);

    if (lovedThePost) {
      throw new Error("Ja curtiu o post!");
    }

    const love = new Love({
      user_id,
      post_id,
    });

    await this.loveRepository.create(love, user_id);

    return love;
  }
}
