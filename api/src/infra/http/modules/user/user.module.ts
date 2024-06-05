import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { CreateUserUseCase } from "src/modules/user/useCases/createUserUseCase";
import { DatabaseModule } from "src/infra/database/database.module";
import { FindUserByEmailUseCase } from "src/modules/user/useCases/findUserByEmail";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserUseCase, FindUserByEmailUseCase],
})
export class UserModule {}
