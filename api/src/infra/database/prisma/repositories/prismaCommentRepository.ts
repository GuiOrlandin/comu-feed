import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PostNotFoundException } from "src/modules/post/exceptions/postNotFoundException";
import { CommentRepository } from "src/modules/comments/repositories/commentRepository";
import { Comment } from "src/modules/comments/entities/comment";
import { PrismaCommentMapper } from "../mappers/prismaCommentMapper";
import { CommentNotFoundException } from "src/modules/comments/exceptions/commentNotFoundException";
import { UserNotAuthorizedException } from "src/modules/comments/exceptions/userNotAuthorizedException";

@Injectable()
export class PrismaCommentRepository implements CommentRepository {
  constructor(private prisma: PrismaService) {}

  async create(comment: Comment): Promise<void> {
    if (comment.text_post_id) {
      const textPost = await this.prisma.textPost.findFirst({
        where: {
          id: comment.text_post_id,
        },
      });

      if (!textPost) {
        throw new PostNotFoundException();
      }

      const commentRaw =
        PrismaCommentMapper.toPrismaCommentWithTextPost(comment);

      await this.prisma.comment.create({
        data: commentRaw,
      });
    }
    if (comment.media_post_id) {
      const mediaPost = await this.prisma.mediaPost.findFirst({
        where: {
          id: comment.media_post_id,
        },
      });

      if (!mediaPost) {
        throw new PostNotFoundException();
      }

      const commentRaw =
        PrismaCommentMapper.toPrismaCommentWithMediaPost(comment);

      await this.prisma.comment.create({
        data: commentRaw,
      });
    }
  }

  async findById(comment_id: string): Promise<Comment> {
    const comment = await this.prisma.comment.findFirst({
      where: {
        id: comment_id,
      },
    });

    if (!comment) {
      return null;
    }

    return new Comment(comment);
  }
  async delete(comment_id: string, user_id: string): Promise<void> {
    const user = await this.prisma.comment.findFirst({
      where: {
        user_id,
      },
    });

    if (!user) {
      throw new UserNotAuthorizedException();
    }

    const comment = await this.prisma.comment.findFirst({
      where: {
        id: comment_id,
      },
    });

    if (!comment) {
      throw new CommentNotFoundException();
    }

    await this.prisma.comment.delete({
      where: {
        id: comment_id,
      },
    });
  }
}
