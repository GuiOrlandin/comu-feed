import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { LoveController } from "./love.controller";
import { CreateLoveInThePostUseCase } from "src/modules/love/useCases/createLoveInThePostUseCase";
import { DeleteLoveInThePostUseCase } from "src/modules/love/useCases/DeleteLoveInThePostUseCase";

@Module({
  imports: [DatabaseModule],
  controllers: [LoveController],
  providers: [CreateLoveInThePostUseCase, DeleteLoveInThePostUseCase],
})
export class LoveModule {}
