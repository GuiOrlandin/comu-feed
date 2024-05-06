import { Community } from "src/modules/community/entities/community";

export abstract class CommunityRepository {
  abstract create(community: Community): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findByName(email: string): Promise<Community | Community[] | null>;
  abstract findById(id: string): Promise<Community | null>;
  abstract joinTheCommunity(
    userId: string,
    communityId: string,
    password?: string,
  ): Promise<void>;
  //   abstract findManyPostsByCommunity(
  //     communityId: string,
  //     page: number,
  //     perPage: number,
  //   ): Promise<Community[]>;
}
