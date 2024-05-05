import { Injectable } from "@nestjs/common";
import { CommunityRepository } from "../repositories/communityRepository";
import { Community } from "../entities/community";

interface CreatedCommunityRequest {
  founder_id: string;
  name: string;
  password?: string;
  key_access: boolean;
}

@Injectable()
export class CreateCommunityUseCase {
  constructor(private communityRepository: CommunityRepository) {}

  async execute({
    founder_id,
    name,
    key_access,
    password,
  }: CreatedCommunityRequest) {
    const community = new Community({
      founder_id,
      key_access,
      name,
      password,
    });

    await this.communityRepository.create(community);

    return community;
  }
}
