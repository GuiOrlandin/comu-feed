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
  }: Community): CommunityRaw {
    return {
      key_access,
      created_at,
      founder_id,
      id,
      name,
      password,
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
