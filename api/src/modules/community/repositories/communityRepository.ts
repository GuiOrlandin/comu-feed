import { Community } from "src/modules/community/entities/community";
import {
  MediaPostWithUser,
  TextPostWithUser,
} from "src/modules/post/repositories/postRepository";

export interface CommunityResponseForIdRequest {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  founder_id: string;
  textPosts: TextPostWithUser[];
  mediaPosts: MediaPostWithUser[];
}

export abstract class CommunityRepository {
  abstract create(community: Community): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findByName(email: string): Promise<Community | Community[] | null>;
  abstract findById(
    id: string,
  ): Promise<CommunityResponseForIdRequest | Community | null>;
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
