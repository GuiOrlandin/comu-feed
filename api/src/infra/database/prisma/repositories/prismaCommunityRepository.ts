import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CommunityRepository } from "src/modules/community/repositories/communityRepository";
import { Community } from "src/modules/community/entities/community";
import { PrismaCommunityMapper } from "../mappers/prismaCommunityMapper";

@Injectable()
export class PrismaCommunityRepository implements CommunityRepository {
  constructor(private prisma: PrismaService) {}
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<Community> {
    const community = await this.prisma.community.findFirst({
      where: {
        id,
      },
    });

    if (!community) {
      return null;
    }

    return PrismaCommunityMapper.toDomain(community);
  }

  async joinTheCommunity(
    userId: string,
    communityId: string,
    password?: string,
  ): Promise<void> {
    const community = await this.prisma.community.findFirst({
      where: {
        id: communityId,
      },
      include: {
        User_Members: true,
      },
    });

    if (!community) {
      throw new Error("A comunidade não existe!");
    }

    if (community.key_access && community.password !== password) {
      throw new Error("Senha incorreta!");
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    const isMember = await this.prisma.community.findFirst({
      where: {
        User_Members: {
          some: {
            id: user.id,
          },
        },
      },
    });

    if (isMember) {
      throw new Error("Já é membro da comunidade!");
    }

    if (!isMember) {
      await this.prisma.community.update({
        where: {
          id: communityId,
        },
        data: {
          User_Members: {
            set: [...community.User_Members, user],
          },
        },
      });
      console.log("foi");
    }
  }

  async findByName(name: string): Promise<Community | Community[] | null> {
    const communities = await this.prisma.community.findMany({
      where: {
        name,
      },
    });

    if (!communities) {
      return null;
    }

    return communities.map(PrismaCommunityMapper.toDomain);
  }

  async create(community: Community): Promise<void> {
    const existingCommunity = await this.prisma.community.findFirst({
      where: {
        name: community.name,
      },
    });

    if (existingCommunity) {
      throw new Error("Community name already in use");
    }

    const communityRaw = PrismaCommunityMapper.toPrisma(community);

    await this.prisma.community.create({
      data: communityRaw,
    });
  }
}
