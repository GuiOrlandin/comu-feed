import { Community } from "src/modules/community/entities/community";
import {
  MediaPostWithUser,
  TextPostWithUser,
} from "src/modules/post/repositories/postRepository";

export interface CommunityResponseForIdRequest {
  id: string;
  name: string;
  description: string;
  community_image: string;
  created_at: Date;
  key_access?: string;
  User_Members: {
    id: string;
  }[];
  founder_id: string;
  allPosts: (TextPostWithUser | MediaPostWithUser)[];
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
  abstract leaveCommunity(userId: string, communityId: string): Promise<void>;
}
