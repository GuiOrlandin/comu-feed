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
import { DeleteLoveInThePostUseCase } from "src/modules/love/useCases/DeleteLoveInThePostUseCase";
import { CreateCommentBody } from "./dtos/commentBody";
import { CreateCommentInThePostUseCase } from "src/modules/comments/useCases/createCommentUseCase";
import { DeleteCommentInThePostUseCase } from "src/modules/comments/useCases/deleteCommentInPostUseCase";

@Controller("comment")
export class CommentController {
  constructor(
    private createCommentInThePostUseCase: CreateCommentInThePostUseCase,
    private deleteCommentInThePostUseCase: DeleteCommentInThePostUseCase,
  ) {}

  @Post()
  async createComment(
    @Request() request: AuthRequestModel,
    @Body() body: CreateCommentBody,
  ) {
    const { media_post_id, text_post_id, content } = body;

    if (media_post_id) {
      await this.createCommentInThePostUseCase.execute({
        user_id: request.user.id,
        postType: "mediaPost",
        media_post_id,
        text_post_id: null,
        content,
      });
    }

    if (text_post_id) {
      await this.createCommentInThePostUseCase.execute({
        user_id: request.user.id,
        postType: "textPost",
        media_post_id: null,
        text_post_id,
        content,
      });
    }
  }

  @Delete(":id")
  async deleteLove(
    @Param("id") comment_id: string,
    @Request() request: AuthRequestModel,
  ) {
    await this.deleteCommentInThePostUseCase.execute({
      comment_id,
      user_id: request.user.id,
    });
  }
}
