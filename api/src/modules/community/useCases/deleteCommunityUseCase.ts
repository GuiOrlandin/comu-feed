import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CommunityRepository } from "../repositories/communityRepository";

interface DeleteCommunityRequest {
  community_id: string;
  user_id: string;
}

@Injectable()
export class DeleteCommunityUseCase {
  constructor(private communityRepository: CommunityRepository) {}

  async execute({ community_id, user_id }: DeleteCommunityRequest) {
    const community = await this.communityRepository.findById(community_id);

    if (!community) {
      throw new NotFoundException();
    }

    if (community.founder_id !== user_id) {
      throw new UnauthorizedException();
    }

    await this.communityRepository.delete(community_id);
  }
}
