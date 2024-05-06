import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { CommunityController } from "./community.controller";
import { CreateCommunityUseCase } from "src/modules/community/useCases/createCommunityUseCase";
import { JoinTheCommunityUseCase } from "src/modules/community/useCases/joinTheCommunityUseCase";
import { DeleteCommunityUseCase } from "src/modules/community/useCases/deleteCommunityUseCase";

@Module({
  imports: [DatabaseModule],
  controllers: [CommunityController],
  providers: [
    CreateCommunityUseCase,
    JoinTheCommunityUseCase,
    DeleteCommunityUseCase,
  ],
})
export class CommunityModule {}
