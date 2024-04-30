import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { UserRepository } from "src/modules/user/repositories/userRepository";
import { PrismaUserRepository } from "./repositories/prismaUserRepository";

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class PrismaModule {}
