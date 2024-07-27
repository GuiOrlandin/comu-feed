import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthRequestModel } from "./models/authRequestModel";
import { SignInUseCase } from "src/modules/auth/useCases/signInUseCase";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { Public } from "./decorators/isPublic";
import { AuthenticatedRequestModel } from "./models/authenticatedRequestModel";
import { SignInWithGoogleEmailBody } from "./dtos/singInWithGoogleEmailBody";

@Controller()
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post("signIn")
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async signIn(@Request() request: AuthRequestModel) {
    const access_token = await this.signInUseCase.execute({
      user: request.user,
    });

    return { access_token };
  }

  @Post("signInWithGoogle")
  @Public()
  async signInWithGoogle(@Body() body: SignInWithGoogleEmailBody) {
    const { emailOfUserLoggedWithGoogle } = body;
    const access_token = await this.signInUseCase.execute({
      emailOfUserLoggedWithGoogle,
    });

    return { access_token };
  }

  @UseGuards(JwtAuthGuard)
  async test(@Request() request: AuthenticatedRequestModel) {
    return request.user;
  }
}
