import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { CreateUserUseCase } from "src/modules/user/useCases/createUserUseCase";
import { CreateUserBody } from "./dtos/createUserBody";
import { UserViewModel } from "./viewModel/viewModel";
import { Public } from "../auth/decorators/isPublic";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { FindUserByEmailUseCase } from "src/modules/user/useCases/findUserByEmail";

@Controller("users")
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private findUserByEmail: FindUserByEmailUseCase,
  ) {}

  @Post()
  @Public()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/userAvatar",
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createUser(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateUserBody,
  ) {
    const { email, name, password_hash, created_at, id } = body;

    if (file) {
      const user = await this.createUserUseCase.execute({
        email,
        name,
        password_hash,
        avatar: file.filename,
      });

      return UserViewModel.toHttp(user);
    }
    const user = await this.createUserUseCase.execute({
      email,
      name,
      password_hash,
    });

    return UserViewModel.toHttp(user);
  }

  @Get()
  @Public()
  async findUser(@Query("email") email: string) {
    const user = await this.findUserByEmail.execute({ email });

    return user;
  }
}
