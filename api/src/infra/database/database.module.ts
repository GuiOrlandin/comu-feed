import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "src/modules/user/repositories/userRepository";
import { PrismaUserRepository } from "./prisma/repositories/prismaUserRepository";
import { CommunityRepository } from "src/modules/community/repositories/communityRepository";
import { PrismaCommunityRepository } from "./prisma/repositories/prismaCommunityRepository";
import { PostRepository } from "src/modules/post/repositories/postRepository";
import { PrismaPostRepository } from "./prisma/repositories/prismaPostRepository";

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
  ],
  exports: [UserRepository, CommunityRepository, PostRepository],
})
export class DatabaseModule {}
