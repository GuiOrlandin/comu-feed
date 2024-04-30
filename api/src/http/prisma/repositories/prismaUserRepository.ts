import { Injectable } from "@nestjs/common";
import { User } from "src/modules/user/entities/User";
import { UserRepository } from "src/modules/user/repositories/userRepository";
import { PrismaService } from "../prisma.service";
import { PrismaUserMapper } from "../mappers/prismaUserMapper";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);
    this.prisma.user.create({
      data: userRaw,
    });
  }
}
