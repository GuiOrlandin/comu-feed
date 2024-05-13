import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { PostController } from "./post.controller";
import { CreatePostUseCase } from "src/modules/post/useCases/createPostUseCase";
import { DeletePostUseCase } from "src/modules/post/useCases/deletePostUseCase";
import { EditPostUseCase } from "src/modules/post/useCases/editPostUseCase";
import { LoveThePostUseCase } from "src/modules/post/useCases/loveThePostUseCase";
import { UnLoveThePostUseCase } from "src/modules/post/useCases/unLoveThePostUseCase";

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [
    CreatePostUseCase,
    DeletePostUseCase,
    EditPostUseCase,
    LoveThePostUseCase,
    UnLoveThePostUseCase,
  ],
})
export class PostModule {}
