import {
  Body,
  Controller,
  Post,
  Put,
  Get,
  Request,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";
import { CreateCommunityUseCase } from "src/modules/community/useCases/createCommunityUseCase";
import { CreateCommunityBody } from "./dtos/createCommunityBody";
import { CommunityViewModel } from "./viewModel/communityViewModel";
import { FileInterceptor } from "@nestjs/platform-express";

import { JoinTheCommunityUseCase } from "src/modules/community/useCases/joinTheCommunityUseCase";
import { JoinTheCommunityBody } from "./dtos/joinTheCommunityBody";
import { AuthRequestModel } from "../auth/models/authRequestModel";
import { DeleteCommunityUseCase } from "src/modules/community/useCases/deleteCommunityUseCase";
import { FindCommunityByIdUseCase } from "src/modules/community/useCases/findCommunityByIdUseCase";
import { Public } from "../auth/decorators/isPublic";

@Controller("community")
export class CommunityController {
  constructor(
    private createCommunityUseCase: CreateCommunityUseCase,
    private findCommunityById: FindCommunityByIdUseCase,
    private joinTheCommunityUseCase: JoinTheCommunityUseCase,
    private deleteTheCommunityUseCase: DeleteCommunityUseCase,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/communityImage",
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
  async createCommunity(
    @UploadedFile() file: Express.Multer.File,
    @Request() request: AuthRequestModel,
    @Body() body: CreateCommunityBody,
  ) {
    const { name, password, key_access, description } = body;
    const user = await this.createCommunityUseCase.execute({
      key_access,
      founder_id: request.user.id,
      name,
      password,
      community_image: file.filename,
      description,
    });

    return CommunityViewModel.toHttp(user);
  }

  @Put(":id")
  async joinCommunity(
    @Request() request: AuthRequestModel,
    @Body() body: JoinTheCommunityBody,
    @Param("id") communityId: string,
  ) {
    const { password } = body;

    await this.joinTheCommunityUseCase.execute({
      communityId,
      userId: request.user.id,
      password,
    });
  }
  @Get(":id")
  @Public()
  async getCommunityById(@Param("id") communityId: string) {
    const community = await this.findCommunityById.execute(communityId);

    return community;
  }

  @Delete(":id")
  async deleteNote(
    @Request() request: AuthRequestModel,
    @Param("id") community_id: string,
  ) {
    await this.deleteTheCommunityUseCase.execute({
      community_id,
      user_id: request.user.id,
    });
  }
}
