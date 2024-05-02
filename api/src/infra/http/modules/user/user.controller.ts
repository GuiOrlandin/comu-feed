import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/modules/user/useCases/createUserUseCase";
import { CreateUserBody } from "./dtos/createUserBody";
import { UserViewModel } from "./viewModel/viewModel";
import { Public } from "../auth/decorators/isPublic";

@Controller("users")
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @Public()
  async createPost(@Body() body: CreateUserBody) {
    const { email, name, password_hash, created_at, id } = body;
    const user = await this.createUserUseCase.execute({
      email,
      name,
      password_hash,
    });

    return UserViewModel.toHttp(user);
  }
}
