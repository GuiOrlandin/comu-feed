import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AuthController {
  @Post("signIn")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("local"))
  async signIn(@Request() request: any) {
    return request.user;
  }
}
