import { Community } from "src/modules/community/entities/community";

export abstract class CommunityRepository {
  abstract create(post: Community): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract enterInCommunity(
    userId: string,
    communityId: string,
    password: string,
  ): Promise<void>;
  //   abstract findManyPostsByCommunity(
  //     communityId: string,
  //     page: number,
  //     perPage: number,
  //   ): Promise<Community[]>;
}
