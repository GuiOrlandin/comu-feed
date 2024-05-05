import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { CommunityController } from "./community.controller";
import { CreateCommunityUseCase } from "src/modules/community/useCases/createCommunityUseCase";

@Module({
  imports: [DatabaseModule],
  controllers: [CommunityController],
  providers: [CreateCommunityUseCase],
})
export class CommunityModule {}
