import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PostRepository } from "src/modules/post/repositories/postRepository";
import { postWithoutPermissionException } from "src/modules/post/exceptions/postWithoutPermissionException";
import { TextPost } from "src/modules/post/entities/textPost";
import { MediaPost } from "src/modules/post/entities/mediaPost";
import { PrismaPostMapper } from "../mappers/prismaPostMapper";

@Injectable()
export class PrismaPostRepository implements PostRepository {
  constructor(private prisma: PrismaService) {}

  async create(post: TextPost | MediaPost): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: post.user_id,
      },
    });

    if (!user) {
      throw new postWithoutPermissionException({
        actionName: "acessar",
      });
    }

    const userInTheCommunity = await this.prisma.community.findFirst({
      where: {
        id: post.community_id,
        OR: [
          {
            User_Members: {
              some: {
                id: user.id,
              },
            },
          },
          {
            founder_id: user.id,
          },
        ],
      },
    });

    if (!userInTheCommunity) {
      throw new postWithoutPermissionException({
        actionName: "acessar",
      });
    }

    if (post instanceof TextPost) {
      const postRaw = PrismaPostMapper.toPrismaTextPost(post);

      await this.prisma.textPost.create({
        data: postRaw,
      });
    } else {
      const postRaw = PrismaPostMapper.toPrismaMediaPost(post);

      await this.prisma.mediaPost.create({
        data: postRaw,
      });
    }
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<TextPost | MediaPost> {
    throw new Error("Method not implemented.");
  }
  save(post: TextPost | MediaPost): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
