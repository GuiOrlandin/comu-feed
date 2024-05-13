import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  Request,
  UploadedFile,
  Delete,
  Param,
  Put,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname } from "path";
import { diskStorage } from "multer";
import { CreatePostBody } from "./dtos/createPostBody";
import { AuthRequestModel } from "../auth/models/authRequestModel";
import { CreatePostUseCase } from "src/modules/post/useCases/createPostUseCase";
import { MediaPostViewModel, TextPostViewModel } from "./view/postViewModel";
import { TextPost } from "src/modules/post/entities/textPost";
import { MediaPost } from "src/modules/post/entities/mediaPost";
import { DeletePostUseCase } from "src/modules/post/useCases/deletePostUseCase";
import { EditPostUseCase } from "src/modules/post/useCases/editPostUseCase";
import { EditPostBody } from "./dtos/editPostBody";
import { Public } from "../auth/decorators/isPublic";
import { LoveThePostUseCase } from "src/modules/post/useCases/loveThePostUseCase";
import { UnLoveThePostUseCase } from "src/modules/post/useCases/unLoveThePostUseCase";

@Controller("post")
export class PostController {
  constructor(
    private createPostUseCase: CreatePostUseCase,
    private deletePostUseCase: DeletePostUseCase,
    private editPostUseCase: EditPostUseCase,
    private loveThePost: LoveThePostUseCase,
    private unLoveThePost: UnLoveThePostUseCase,
  ) {}

  @Post("textPost")
  async createPost(
    @Request() request: AuthRequestModel,
    @Body() body: CreatePostBody,
  ) {
    const { community_id, content, title } = body;
    const post = await this.createPostUseCase.execute({
      community_id,
      content,
      title,
      user_id: request.user.id,
      postType: "textPost",
    });

    if (post instanceof TextPost) {
      return TextPostViewModel.toHttp(post);
    }
  }

  @Post("mediaPost")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
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
  async handleUpload(
    @UploadedFile() file: Express.Multer.File,
    @Request() request: AuthRequestModel,
    @Body() body: CreatePostBody,
  ) {
    const { community_id, title } = body;
    const post = await this.createPostUseCase.execute({
      community_id,
      media: file.filename,
      title,
      user_id: request.user.id,
      postType: "mediaPost",
    });

    if (post instanceof MediaPost) {
      return MediaPostViewModel.toHttp(post);
    }
  }

  @Put(":id")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
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
  async editPost(
    @Request() request: AuthRequestModel,
    @Param("id") post_id: string,
    @Body() body: EditPostBody,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { content, title } = body;

    if (content) {
      await this.editPostUseCase.execute({
        post_id,
        user_id: request.user.id,
        title,
        content,
      });
    } else {
      await this.editPostUseCase.execute({
        post_id,
        user_id: request.user.id,
        title,
        media: file.filename,
      });
    }
  }

  @Put("love/:id")
  async love(@Param("id") post_id: string) {
    await this.loveThePost.execute({ post_id });
  }

  @Put("unlove/:id")
  async unLove(@Param("id") post_id: string) {
    await this.unLoveThePost.execute({ post_id });
  }

  @Delete(":id")
  async deletePost(
    @Request() request: AuthRequestModel,
    @Param("id") post_id: string,
  ) {
    await this.deletePostUseCase.execute({
      post_id,
      userId: request.user.id,
    });
  }
}
