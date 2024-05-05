import { Community } from "src/modules/community/entities/community";

export class CommunityViewModel {
  static toHttp({ User_Members, created_at, founder_id, id, name }: Community) {
    return {
      User_Members,
      created_at,
      founder_id,
      id,
      name,
    };
  }
}
