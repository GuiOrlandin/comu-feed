import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/modules/user/useCases/createUserUseCase";
import { CreateUserBody } from "./dtos/userBody";

@Controller("users")
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createPost(@Body() body: CreateUserBody) {
    const { email, name, password_hash } = body;
    const user = await this.createUserUseCase.execute({
      email,
      name,
      password_hash,
    });

    return user;
  }
}
