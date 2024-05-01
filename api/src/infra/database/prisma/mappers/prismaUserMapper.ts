import { User } from "src/modules/user/entities/User";
import { User as UserRaw } from "@prisma/client";

export class PrismaUserMapper {
  static toPrisma({
    email,
    name,
    password_hash,
    created_at,
    id,
  }: User): UserRaw {
    return {
      email,
      name,
      password_hash,
      created_at,
      id,
    };
  }

  static toDomain({
    email,
    name,
    password_hash,
    created_at,
    id,
  }: UserRaw): User {
    return new User({
      email,
      name,
      password_hash,
      created_at,
      id,
    });
  }
}
