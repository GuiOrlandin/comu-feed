import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Put,
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
import { EditUserUseCase } from "src/modules/user/useCases/editUserUseCase";
import { AuthRequestModel } from "../auth/models/authRequestModel";
import { EditUserBody } from "./dtos/editUserBody";

@Controller("users")
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private editUserUseCase: EditUserUseCase,
    private findUserByEmail: FindUserByEmailUseCase,
  ) {}

  @Post()
  @Public()
  async createUser(@Body() body: CreateUserBody) {
    const { email, name, password_hash, avatar } = body;

    const user = await this.createUserUseCase.execute({
      email,
      name,
      password_hash,
      avatar,
    });

    return UserViewModel.toHttp(user);
  }

  @Put()
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
  async editUser(
    @UploadedFile() file: Express.Multer.File,
    @Request() request: AuthRequestModel,
    @Body() body: EditUserBody,
  ) {
    const { name } = body;

    if (file) {
      const user = await this.editUserUseCase.execute({
        name,
        avatarUrl: file.filename,
        user_id: request.user.id,
      });

      return UserViewModel.toHttp(user);
    }

    const user = await this.editUserUseCase.execute({
      name,
      user_id: request.user.id,
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
