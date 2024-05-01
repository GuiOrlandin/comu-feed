import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthRequestModel } from "./models/authRequestModel";
import { SignInUseCase } from "src/modules/auth/useCases/signInUseCase";

@Controller()
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post("signIn")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("local"))
  async signIn(@Request() request: AuthRequestModel) {
    const access_token = await this.signInUseCase.execute({
      user: request.user,
    });

    return access_token;
  }
}
