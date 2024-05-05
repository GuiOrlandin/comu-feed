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
  findById(id: string): Promise<Community> {
    throw new Error("Method not implemented.");
  }
  joinTheCommunity(
    userId: string,
    communityId: string,
    password?: string,
  ): Promise<void> {
    throw new Error("Method not implemented.");
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
