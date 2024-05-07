import { makeUser } from "src/modules/user/factories/userFactory";
import { Community } from "../entities/community";

type Override = Partial<Community>;

export function makeCommunityWithoutPassword({ ...override }: Override) {
  const user = makeUser({
    password_hash: "123456",
  });

  return new Community({
    founder_id: user.id,
    key_access: false,
    name: "Community",
    ...override,
  });
}

export function makeCommunityWithPassword({ ...override }: Override) {
  const user = makeUser({
    password_hash: "123456",
  });

  return new Community({
    founder_id: user.id,
    key_access: true,
    name: "Community",
    password: "123456",
    ...override,
  });
}
