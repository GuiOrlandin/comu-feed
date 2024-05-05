import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "src/modules/user/repositories/userRepository";
import { PrismaUserRepository } from "./prisma/repositories/prismaUserRepository";
import { CommunityRepository } from "src/modules/community/repositories/communityRepository";
import { PrismaCommunityRepository } from "./prisma/repositories/prismaCommunityRepository";

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
  ],
  exports: [UserRepository, CommunityRepository],
})
export class DatabaseModule {}
