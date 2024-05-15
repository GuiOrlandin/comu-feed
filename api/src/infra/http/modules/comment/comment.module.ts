import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { CommentController } from "./comment.controller";
import { CreateCommentInThePostUseCase } from "src/modules/comments/useCases/createCommentUseCase";
import { DeleteCommentInThePostUseCase } from "src/modules/comments/useCases/deleteCommentInPostUseCase";

@Module({
  imports: [DatabaseModule],
  controllers: [CommentController],
  providers: [CreateCommentInThePostUseCase, DeleteCommentInThePostUseCase],
})
export class CommentModule {}
