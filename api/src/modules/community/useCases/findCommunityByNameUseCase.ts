import { Injectable, NotFoundException } from "@nestjs/common";
import { CommunityRepository } from "../repositories/communityRepository";

@Injectable()
export class FindCommunityByNameUseCase {
  constructor(private communityRepository: CommunityRepository) {}

  async execute(community_name: string) {
    const community = await this.communityRepository.findByName(community_name);

    if (!community) {
      throw new NotFoundException();
    }

    return community;
  }
}
