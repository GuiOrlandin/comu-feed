import { Injectable } from "@nestjs/common";
import { User } from "src/modules/user/entities/User";
import { UserRepository } from "src/modules/user/repositories/userRepository";
import { PrismaService } from "../prisma.service";
import { PrismaUserMapper } from "../mappers/prismaUserMapper";
import { EmailAlreadyInUseException } from "src/modules/user/exceptions/emailAlreadyInUse";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  private async deleteFile(filePath: string): Promise<void> {
    const fullPath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "..",
      "uploads",
      "userAvatar",
      filePath,
    );

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }

  async findByEmail(email: string): Promise<Partial<User> | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },

      include: {
        community_Founder: true,
        community_Member: true,
        comments: true,
        mediaPosts: true,
        textPosts: true,
        love: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      password_hash: undefined,
    };
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      throw new EmailAlreadyInUseException();
    }

    const userRaw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: userRaw,
    });
  }

  async save(user: User): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);

    const userUnmodified = await this.prisma.user.findFirst({
      where: {
        id: userRaw.id,
      },
    });

    if (user.avatar !== null && userUnmodified.avatar !== null) {
      await this.deleteFile(userUnmodified.avatar);

      await this.prisma.user.update({
        data: userRaw,
        where: {
          id: userUnmodified.id,
        },
      });
    }

    if (userUnmodified.avatar === null) {
      await this.prisma.user.update({
        data: userRaw,
        where: {
          id: userUnmodified.id,
        },
      });
    }

    await this.prisma.user.update({
      data: { ...userRaw, avatar: userUnmodified.avatar },
      where: {
        id: userUnmodified.id,
      },
    });
  }
}
