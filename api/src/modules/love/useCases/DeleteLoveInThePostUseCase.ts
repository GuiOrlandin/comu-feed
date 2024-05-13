import { Injectable } from "@nestjs/common";

import { LoveRepository } from "../repositories/loveRepository";

interface DeleteLoveInThePostUseCaseRequest {
  love_id: string;
}

@Injectable()
export class DeleteLoveInThePostUseCase {
  constructor(private loveRepository: LoveRepository) {}

  async execute({ love_id }: DeleteLoveInThePostUseCaseRequest) {
    const love = await this.loveRepository.findById(love_id);

    if (!love) {
      throw new Error("Love Not Found!");
    }

    await this.loveRepository.delete(love.id);
  }
}
