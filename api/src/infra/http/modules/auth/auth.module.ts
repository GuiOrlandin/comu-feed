import { Module, MiddlewareConsumer } from "@nestjs/common";
import { LocalStrategy } from "src/modules/auth/strategies/local.strategies";
import { AuthController } from "./auth.controller";
import { ValidateUserUseCase } from "src/modules/auth/useCases/validateUserUseCase";
import { UserModule } from "../user/user.module";
import { DatabaseModule } from "src/infra/database/database.module";
import { SignInDTOValidateMiddleware } from "./middleware/singInDTOValidade.middleware";

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AuthController],
  providers: [LocalStrategy, ValidateUserUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(SignInDTOValidateMiddleware).forRoutes("/signIn")
  }
}
