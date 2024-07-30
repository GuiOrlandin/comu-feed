import { Injectable, NotFoundException } from "@nestjs/common";
import { CommunityRepository } from "../repositories/communityRepository";

interface LeaveCommunityRequest {
  userId: string;
  communityId: string;
}

@Injectable()
export class LeaveCommunityUseCase {
  constructor(private communityRepository: CommunityRepository) {}

  async execute({ communityId, userId }: LeaveCommunityRequest) {
    const community = await this.communityRepository.findById(communityId);

    if (!community) {
      throw new NotFoundException();
    }

    await this.communityRepository.leaveCommunity(userId, communityId);
  }
}
