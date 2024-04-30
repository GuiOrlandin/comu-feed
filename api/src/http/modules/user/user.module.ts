import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { CreateUserUseCase } from "src/modules/user/useCases/createUserUseCase";
import { PrismaModule } from "src/http/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [CreateUserUseCase],
})
export class UserModule {}
