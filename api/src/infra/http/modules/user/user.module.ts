import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { CreateUserUseCase } from "src/modules/user/useCases/createUserUseCase";
import { DatabaseModule } from "src/infra/database/database.module";
import { FindUserByEmailUseCase } from "src/modules/user/useCases/findUserByEmail";
import { EditUserUseCase } from "src/modules/user/useCases/editUserUseCase";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserUseCase, FindUserByEmailUseCase, EditUserUseCase],
})
export class UserModule {}
