import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { PostController } from "./post.controller";
import { CreatePostUseCase } from "src/modules/post/useCases/createPostUseCase";
import { DeletePostUseCase } from "src/modules/post/useCases/deletePostUseCase";
import { EditPostUseCase } from "src/modules/post/useCases/editPostUseCase";
import { FindAllPostsUseCase } from "src/modules/post/useCases/findAllPostsUseCase";
import { FindPostByIdUseCase } from "src/modules/post/useCases/findPostByIdUseCase";

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [
    CreatePostUseCase,
    DeletePostUseCase,
    EditPostUseCase,
    FindAllPostsUseCase,
    FindPostByIdUseCase,
  ],
})
export class PostModule {}
