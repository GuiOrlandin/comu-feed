import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { LoveRepository } from "src/modules/love/repositories/loveRepository";
import { Love } from "src/modules/love/entities/love";
import { PrismaLoveMapper } from "../mappers/prismaLoveMapper";
import { PostNotFoundException } from "src/modules/post/exceptions/postNotFoundException";
import { LoveNotFoundException } from "src/modules/love/exceptions/loveNotFoundException";

@Injectable()
export class PrismaLoveRepository implements LoveRepository {
  constructor(private prisma: PrismaService) {}

  async checkUserLikedThePostByUserId(
    user_id: string,
    media_post_id: string,
    text_post_id: string,
  ): Promise<boolean> {
    if (media_post_id) {
      const user = await this.prisma.love.findFirst({
        where: {
          user_id,
          AND: {
            media_post_id,
          },
        },
      });

      if (user) {
        return true;
      }

      return false;
    } else {
      const user = await this.prisma.love.findFirst({
        where: {
          user_id,
          AND: {
            text_post_id,
          },
        },
      });

      if (user) {
        return true;
      }

      return false;
    }
  }

  async create(love: Love): Promise<void> {
    if (love.text_post_id) {
      const textPost = await this.prisma.textPost.findFirst({
        where: {
          id: love.text_post_id,
        },
      });

      if (!textPost) {
        throw new PostNotFoundException();
      }

      const loveRaw = PrismaLoveMapper.toPrismaLoveWithTextPost(love);

      await this.prisma.love.create({
        data: loveRaw,
      });
    }
    if (love.media_post_id) {
      const mediaPost = await this.prisma.mediaPost.findFirst({
        where: {
          id: love.media_post_id,
        },
      });

      if (!mediaPost) {
        throw new PostNotFoundException();
      }

      const loveRaw = PrismaLoveMapper.toPrismaLoveWithMediaPost(love);

      await this.prisma.love.create({
        data: loveRaw,
      });
    }
  }

  async findById(love_id: string): Promise<Love> {
    const love = await this.prisma.love.findFirst({
      where: {
        id: love_id,
      },
    });

    if (!love) {
      return null;
    }

    return new Love(love);
  }
  async delete(love_id: string): Promise<void> {
    const love = await this.prisma.love.findFirst({
      where: {
        id: love_id,
      },
    });

    if (!love) {
      throw new LoveNotFoundException();
    }

    await this.prisma.love.delete({
      where: {
        id: love_id,
      },
    });
  }
}
