import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "../auth/decorators/isPublic";
import { CreateCommunityUseCase } from "src/modules/community/useCases/createCommunityUseCase";
import { CreateCommunityBody } from "./dtos/createCommunityBody";
import { CommunityViewModel } from "./viewModel/communityViewModel";

@Controller("community")
export class CommunityController {
  constructor(private createCommunityUseCase: CreateCommunityUseCase) {}

  @Post()
  @Public()
  async createCommunity(@Body() body: CreateCommunityBody) {
    const { founder_id, name, password, key_access } = body;
    const user = await this.createCommunityUseCase.execute({
      key_access,
      founder_id,
      name,
      password,
    });

    return CommunityViewModel.toHttp(user);
  }
}
