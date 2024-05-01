import { Module, MiddlewareConsumer } from "@nestjs/common";
import { LocalStrategy } from "src/modules/auth/strategies/local.strategies";
import { AuthController } from "./auth.controller";
import { ValidateUserUseCase } from "src/modules/auth/useCases/validateUserUseCase";
import { UserModule } from "../user/user.module";
import { DatabaseModule } from "src/infra/database/database.module";
import { SignInDTOValidateMiddleware } from "./middleware/singInDTOValidade.middleware";
import { SignInUseCase } from "src/modules/auth/useCases/signInUseCase";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, ValidateUserUseCase, SignInUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDTOValidateMiddleware).forRoutes("/signIn");
  }
}
