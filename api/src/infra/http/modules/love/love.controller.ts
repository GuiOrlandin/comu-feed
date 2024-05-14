import {
  Delete,
  Controller,
  Post,
  Request,
  Param,
  Body,
  Put,
} from "@nestjs/common";
import { AuthRequestModel } from "../auth/models/authRequestModel";
import { CreateLoveInThePostUseCase } from "src/modules/love/useCases/createLoveInThePostUseCase";
import { DeleteLoveInThePostUseCase } from "src/modules/love/useCases/DeleteLoveInThePostUseCase";
import { CreateLoveBody } from "./dtos/loveBody";

@Controller("love")
export class LoveController {
  constructor(
    private createLoveInThePostUseCase: CreateLoveInThePostUseCase,
    private deleteLoveInThePostUseCase: DeleteLoveInThePostUseCase,
  ) {}

  @Post()
  async createLove(
    @Request() request: AuthRequestModel,
    @Body() body: CreateLoveBody,
  ) {
    const { media_post_id, text_post_id } = body;

    if (media_post_id) {
      await this.createLoveInThePostUseCase.execute({
        user_id: request.user.id,
        postType: "mediaPost",
        media_post_id,
        text_post_id: null,
      });
    }

    if (text_post_id) {
      await this.createLoveInThePostUseCase.execute({
        user_id: request.user.id,
        postType: "textPost",
        media_post_id: null,
        text_post_id,
      });
    }
  }

  @Delete(":id")
  async deleteLove(@Param("id") love_id: string) {
    await this.deleteLoveInThePostUseCase.execute({
      love_id,
    });
  }
}
