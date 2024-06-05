import { Injectable, NotFoundException } from "@nestjs/common";
import { CommunityRepository } from "../repositories/communityRepository";
import { Community } from "../entities/community";
import { UserRepository } from "src/modules/user/repositories/userRepository";

interface JoinTheCommunityRequest {
  userId: string;
  communityId: string;
  password?: string;
}

@Injectable()
export class JoinTheCommunityUseCase {
  constructor(private communityRepository: CommunityRepository) {}

  async execute({ communityId, userId, password }: JoinTheCommunityRequest) {
    const community = await this.communityRepository.findById(communityId);

    if (!community) {
      throw new NotFoundException();
    }

    if (password) {
      return await this.communityRepository.joinTheCommunity(
        userId,
        communityId,
        password,
      );
    }
    await this.communityRepository.joinTheCommunity(userId, communityId);
  }
}
