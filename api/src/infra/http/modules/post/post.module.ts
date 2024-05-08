import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { PostController } from "./post.controller";
import { CreatePostUseCase } from "src/modules/post/useCases/createPostUseCase";

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [CreatePostUseCase],
})
export class PostModule {}
