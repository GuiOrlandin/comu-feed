import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import {
  CommunityRepository,
  CommunityResponseForIdRequest,
} from "src/modules/community/repositories/communityRepository";
import { Community } from "src/modules/community/entities/community";
import { PrismaCommunityMapper } from "../mappers/prismaCommunityMapper";
import {
  MediaPostWithUser,
  TextPostWithUser,
} from "src/modules/post/repositories/postRepository";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class PrismaCommunityRepository implements CommunityRepository {
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
      "communityImage",
      filePath,
    );
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }

  async delete(id: string): Promise<void> {
    await this.prisma.mediaPost.deleteMany({
      where: {
        community_id: id,
      },
    });

    await this.prisma.textPost.deleteMany({
      where: {
        community_id: id,
      },
    });

    const community = await this.prisma.community.findFirst({
      where: {
        id,
      },
    });

    await this.deleteFile(community.community_image);

    await this.prisma.community.delete({
      where: {
        id,
      },
    });
  }

  async findById(id: string): Promise<CommunityResponseForIdRequest | null> {
    const communityRecord = await this.prisma.community.findFirst({
      where: { id },
      include: {
        User_Members: {
          select: {
            id: true,
          },
        },
        mediaPosts: {
          orderBy: {
            created_at: "desc",
          },
          include: {
            user: {
              select: {
                avatar: true,
                email: true,
                name: true,
              },
            },
            comments: {
              select: {
                content: true,
                id: true,
                user: {
                  select: {
                    id: true,
                    avatar: true,
                    email: true,
                    name: true,
                  },
                },
                created_at: true,
              },
            },
            community: {
              select: {
                name: true,
              },
            },
            love: {
              select: {
                id: true,
                media_post_id: true,
                text_post_id: true,
                user: {
                  select: {
                    avatar: true,
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
        textPosts: {
          orderBy: {
            created_at: "desc",
          },
          include: {
            user: {
              select: {
                avatar: true,
                email: true,
                name: true,
              },
            },
            comments: {
              select: {
                content: true,
                id: true,
                user: {
                  select: {
                    id: true,
                    avatar: true,
                    email: true,
                    name: true,
                  },
                },
                created_at: true,
              },
            },
            community: {
              select: {
                name: true,
              },
            },
            love: {
              select: {
                id: true,
                media_post_id: true,
                text_post_id: true,
                user: {
                  select: {
                    avatar: true,
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!communityRecord) {
      return null;
    }

    const textPosts: TextPostWithUser[] = communityRecord.textPosts.map(
      (record) => ({
        id: record.id,
        title: record.title,
        user_id: record.user_id,
        community_id: record.community_id,
        content: record.content,
        created_at: record.created_at,
        user: {
          avatar: record.user.avatar,
          email: record.user.email,
          name: record.user.name,
        },
        community: {
          name: record.community.name,
        },
        love: record.love.map((love) => ({
          id: love.id,
          media_post_id: love.media_post_id,
          text_post_id: love.text_post_id,
          user: {
            avatar: love.user.avatar,
            name: love.user.name,
            id: love.user.id,
          },
        })),
        comments: record.comments.map((comment) => ({
          content: comment.content,
          id: comment.id,
          user: {
            id: comment.user.id,
            avatar: comment.user.avatar,
            email: comment.user.email,
            name: comment.user.name,
          },
          created_at: comment.created_at,
        })),
      }),
    );

    const mediaPosts: MediaPostWithUser[] = communityRecord.mediaPosts.map(
      (record) => ({
        id: record.id,
        title: record.title,
        user_id: record.user_id,
        community_id: record.community_id,
        media: record.media,
        created_at: record.created_at,
        description: record.description,
        user: {
          avatar: record.user.avatar,
          email: record.user.email,
          name: record.user.name,
        },
        community: {
          name: record.community.name,
        },
        love: record.love.map((love) => ({
          id: love.id,
          media_post_id: love.media_post_id,
          text_post_id: love.text_post_id,
          user: {
            avatar: love.user.avatar,
            name: love.user.name,
            id: love.user.id,
          },
        })),
        comments: record.comments.map((comment) => ({
          content: comment.content,
          id: comment.id,
          user: {
            id: comment.user.id,
            avatar: comment.user.avatar,
            email: comment.user.email,
            name: comment.user.name,
          },
          created_at: comment.created_at,
        })),
      }),
    );

    const allPosts: (TextPostWithUser | MediaPostWithUser)[] = [
      ...textPosts,
      ...mediaPosts,
    ];

    return {
      id: communityRecord.id,
      name: communityRecord.name,
      description: communityRecord.description,
      created_at: communityRecord.created_at,
      founder_id: communityRecord.founder_id,
      community_image: communityRecord.community_image,
      key_access: communityRecord.key_access,
      User_Members: communityRecord.User_Members,
      allPosts: allPosts,
    };
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

    if (community.key_access === "true" && community.password !== password) {
      throw new Error("Senha incorreta!");
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    const isMember = await this.prisma.community.findFirst({
      where: {
        id: communityId,
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
    }
  }

  async findByName(name: string): Promise<Community | Community[] | null> {
    const communities = await this.prisma.community.findMany({
      where: {
        name,
      },
      include: {
        mediaPosts: true,
        textPosts: true,
        User_Founder: true,
        User_Members: true,
        _count: true,
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
