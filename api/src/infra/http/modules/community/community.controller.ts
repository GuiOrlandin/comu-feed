import {
  Body,
  Controller,
  Post,
  Put,
  Request,
  Param,
  Delete,
} from "@nestjs/common";
import { CreateCommunityUseCase } from "src/modules/community/useCases/createCommunityUseCase";
import { CreateCommunityBody } from "./dtos/createCommunityBody";
import { CommunityViewModel } from "./viewModel/communityViewModel";
import { JoinTheCommunityUseCase } from "src/modules/community/useCases/joinTheCommunityUseCase";
import { JoinTheCommunityBody } from "./dtos/joinTheCommunityBody";
import { AuthRequestModel } from "../auth/models/authRequestModel";
import { DeleteCommunityUseCase } from "src/modules/community/useCases/deleteCommunityUseCase";

@Controller("community")
export class CommunityController {
  constructor(
    private createCommunityUseCase: CreateCommunityUseCase,
    private joinTheCommunityUseCase: JoinTheCommunityUseCase,
    private deleteTheCommunityUseCase: DeleteCommunityUseCase,
  ) {}

  @Post()
  async createCommunity(
    @Request() request: AuthRequestModel,
    @Body() body: CreateCommunityBody,
  ) {
    const { name, password, key_access } = body;
    const user = await this.createCommunityUseCase.execute({
      key_access,
      founder_id: request.user.id,
      name,
      password,
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
