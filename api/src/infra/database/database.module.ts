import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "src/modules/user/repositories/userRepository";
import { PrismaUserRepository } from "./prisma/repositories/prismaUserRepository";
import { CommunityRepository } from "src/modules/community/repositories/communityRepository";
import { PrismaCommunityRepository } from "./prisma/repositories/prismaCommunityRepository";
import { PostRepository } from "src/modules/post/repositories/postRepository";
import { PrismaPostRepository } from "./prisma/repositories/prismaPostRepository";
import { LoveRepository } from "src/modules/love/repositories/loveRepository";
import { PrismaLoveRepository } from "./prisma/repositories/prismaLoveRepository";
import { CommentRepository } from "src/modules/comments/repositories/commentRepository";
import { PrismaCommentRepository } from "./prisma/repositories/prismaCommentRepository";

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: CommunityRepository,
      useClass: PrismaCommunityRepository,
    },
    {
      provide: PostRepository,
      useClass: PrismaPostRepository,
    },
    {
      provide: LoveRepository,
      useClass: PrismaLoveRepository,
    },

    {
      provide: CommentRepository,
      useClass: PrismaCommentRepository,
    },
  ],
  exports: [
    UserRepository,
    CommunityRepository,
    PostRepository,
    LoveRepository,
    CommentRepository,
  ],
})
export class DatabaseModule {}
