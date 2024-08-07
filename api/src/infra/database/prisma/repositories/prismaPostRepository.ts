import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import * as fs from "fs";
import * as path from "path";
import {
  MediaPostWithUser,
  PostRepository,
  TextPostWithUser,
} from "src/modules/post/repositories/postRepository";
import { postWithoutPermissionException } from "src/modules/post/exceptions/postWithoutPermissionException";
import { TextPost } from "src/modules/post/entities/textPost";
import { MediaPost } from "src/modules/post/entities/mediaPost";
import { PrismaPostMapper } from "../mappers/prismaPostMapper";
import { PostNotFoundException } from "src/modules/post/exceptions/postNotFoundException";

@Injectable()
export class PrismaPostRepository implements PostRepository {
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
      filePath,
    );
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }

  async create(post: TextPost | MediaPost): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: post.user_id,
      },
    });

    if (!user) {
      throw new postWithoutPermissionException({
        actionName: "criar",
      });
    }

    const userInTheCommunity = await this.prisma.community.findFirst({
      where: {
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
        actionName: "criar",
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

  async delete(id: string, user_id: string): Promise<void> {
    const textPost = await this.prisma.textPost.findFirst({
      where: {
        id,
      },
    });

    const mediaPost = await this.prisma.mediaPost.findFirst({
      where: {
        id,
      },
    });

    if (!textPost && !mediaPost) {
      throw new PostNotFoundException();
    }

    if (textPost) {
      const user = await this.prisma.textPost.findFirst({
        where: {
          user_id: textPost.user_id,
        },
      });

      const community = await this.prisma.community.findFirst({
        where: {
          id: textPost.community_id,
        },
      });

      if (!user && community.founder_id !== user_id) {
        throw new postWithoutPermissionException({
          actionName: "deletar",
        });
      }

      await this.prisma.textPost.delete({
        where: {
          id,
        },
      });
    }

    if (mediaPost) {
      const user = await this.prisma.mediaPost.findFirst({
        where: {
          user_id: mediaPost.user_id,
        },
      });

      const community = await this.prisma.community.findFirst({
        where: {
          id: mediaPost.community_id,
        },
      });

      if (!user && community.founder_id !== user_id) {
        throw new postWithoutPermissionException({
          actionName: "deletar",
        });
      }

      await this.deleteFile(mediaPost.media);
      await this.prisma.mediaPost.delete({
        where: {
          id,
        },
      });
    }
  }

  async findAllPosts(): Promise<(TextPostWithUser | MediaPostWithUser)[]> {
    const textPostRecords = await this.prisma.textPost.findMany({
      where: {
        community: {
          key_access: "false",
        },
      },
      include: {
        user: {
          select: {
            id: false,
            avatar: true,
            created_at: false,
            email: true,
            name: true,
            password_hash: false,
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
        love: {
          select: {
            id: true,
            media_post_id: true,
            text_post_id: true,
            user_id: true,
            user: {
              select: {
                avatar: true,
                name: true,
                id: true,
              },
            },
          },
        },
        community: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const mediaPostRecords = await this.prisma.mediaPost.findMany({
      where: {
        community: {
          key_access: "false",
        },
      },
      include: {
        user: {
          select: {
            id: false,
            avatar: true,
            created_at: false,
            email: true,
            name: true,
            password_hash: false,
          },
        },
        love: {
          select: {
            id: true,
            media_post_id: true,
            text_post_id: true,
            user_id: true,
            user: {
              select: {
                avatar: true,
                name: true,
                id: true,
              },
            },
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
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const textPosts: TextPostWithUser[] = textPostRecords.map((record) => ({
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
    }));

    const mediaPosts: MediaPostWithUser[] = mediaPostRecords.map((record) => ({
      id: record.id,
      title: record.title,
      user_id: record.user_id,
      community_id: record.community_id,
      media: record.media,
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
    }));

    const allPosts: (TextPostWithUser | MediaPostWithUser)[] = [
      ...textPosts,
      ...mediaPosts,
    ];

    return allPosts;
  }

  async findById(
    id: string,
  ): Promise<TextPostWithUser | MediaPostWithUser | null> {
    const textPostData = await this.prisma.textPost.findFirst({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            id: false,
            avatar: true,
            created_at: false,
            email: true,
            name: true,
            password_hash: false,
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
        love: {
          select: {
            id: true,
            media_post_id: true,
            text_post_id: true,
            user_id: true,
            user: {
              select: {
                avatar: true,
                name: true,
                id: true,
              },
            },
          },
        },
        community: {
          select: {
            name: true,
          },
        },
      },
    });

    const mediaPostData = await this.prisma.mediaPost.findFirst({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            id: false,
            avatar: true,
            created_at: false,
            email: true,
            name: true,
            password_hash: false,
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
        love: {
          select: {
            id: true,
            media_post_id: true,
            text_post_id: true,
            user_id: true,
            user: {
              select: {
                avatar: true,
                name: true,
                id: true,
              },
            },
          },
        },
        community: {
          select: {
            name: true,
          },
        },
      },
    });

    if (textPostData) {
      return textPostData;
    }
    if (mediaPostData) {
      return mediaPostData;
    }

    throw new PostNotFoundException();
  }
  async save(post: TextPost | MediaPost): Promise<void> {
    if (post instanceof TextPost) {
      const postRaw = PrismaPostMapper.toPrismaTextPost(post);

      await this.prisma.textPost.update({
        data: postRaw,
        where: {
          id: postRaw.id,
        },
      });
    }
    if (post instanceof MediaPost) {
      const postRaw = PrismaPostMapper.toPrismaMediaPost(post);

      const postWithUnmodifiedMedia = await this.prisma.mediaPost.findFirst({
        where: {
          id: post.id,
        },
      });

      await this.deleteFile(postWithUnmodifiedMedia.media);

      await this.prisma.mediaPost.update({
        data: postRaw,
        where: {
          id: postRaw.id,
        },
      });
    }
  }
}
