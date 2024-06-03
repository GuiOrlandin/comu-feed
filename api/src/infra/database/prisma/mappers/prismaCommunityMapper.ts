import { Community as CommunityRaw } from "@prisma/client";
import { Community } from "src/modules/community/entities/community";

export class PrismaCommunityMapper {
  static toPrisma({
    created_at,
    founder_id,
    id,
    key_access,
    name,
    password,
    community_image,
  }: Community): CommunityRaw {
    return {
      key_access,
      created_at,
      founder_id,
      id,
      name,
      password,
      community_image,
    };
  }

  static toDomain({
    created_at,
    founder_id,
    id,
    name,
    key_access,
  }: CommunityRaw): Community {
    return new Community({
      key_access,
      created_at,
      founder_id,
      id,
      name,
    });
  }
}
