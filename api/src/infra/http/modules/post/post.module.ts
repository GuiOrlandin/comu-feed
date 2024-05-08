import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { PostController } from "./post.controller";
import { CreatePostUseCase } from "src/modules/post/useCases/createPostUseCase";
import { DeletePostUseCase } from "src/modules/post/useCases/deletePostUseCase";

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [CreatePostUseCase, DeletePostUseCase],
})
export class PostModule {}
