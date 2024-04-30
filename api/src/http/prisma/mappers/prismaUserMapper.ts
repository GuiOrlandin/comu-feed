import { User } from "src/modules/user/entities/User";
import { User as UserRaw } from "@prisma/client";

export class PrismaUserMapper {
  static toPrisma({ id, createdAt, email, name, password }: User): UserRaw {
    return {
      created_at: createdAt,
      email,
      id,
      name,
      password_hash: password,
    };
  }
}
