import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { CommunityController } from "./community.controller";
import { CreateCommunityUseCase } from "src/modules/community/useCases/createCommunityUseCase";
import { JoinTheCommunityUseCase } from "src/modules/community/useCases/joinTheCommunityUseCase";
import { DeleteCommunityUseCase } from "src/modules/community/useCases/deleteCommunityUseCase";
import { FindCommunityByIdUseCase } from "src/modules/community/useCases/findCommunityByIdUseCase";
import { FindCommunityByNameUseCase } from "src/modules/community/useCases/findCommunityByNameUseCase";

@Module({
  imports: [DatabaseModule],
  controllers: [CommunityController],
  providers: [
    CreateCommunityUseCase,
    JoinTheCommunityUseCase,
    DeleteCommunityUseCase,
    FindCommunityByIdUseCase,
    FindCommunityByNameUseCase,
  ],
})
export class CommunityModule {}
