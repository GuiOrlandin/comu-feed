import { Injectable, NotFoundException } from "@nestjs/common";
import { CommunityRepository } from "../repositories/communityRepository";

@Injectable()
export class FindCommunityByIdUseCase {
  constructor(private communityRepository: CommunityRepository) {}

  async execute(community_id: string) {
    const community = await this.communityRepository.findById(community_id);

    if (!community) {
      throw new NotFoundException();
    }

    return community;
  }
}
