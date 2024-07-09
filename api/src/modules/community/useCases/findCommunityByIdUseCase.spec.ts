import { CreateCommunityUseCase } from "./createCommunityUseCase";
import { CommunityRepositoryInMemory } from "../repositories/communityRepositoryInMemory";
import { makeUser } from "src/modules/user/factories/userFactory";
import { FindCommunityByIdUseCase } from "./findCommunityByIdUseCase";

let createCommunityUseCase: CreateCommunityUseCase;
let communityRepositoryInMemory: CommunityRepositoryInMemory;
let findCommunityById: FindCommunityByIdUseCase;

describe("Find Community by id", () => {
  beforeEach(() => {
    communityRepositoryInMemory = new CommunityRepositoryInMemory();
    createCommunityUseCase = new CreateCommunityUseCase(
      communityRepositoryInMemory,
    );
    findCommunityById = new FindCommunityByIdUseCase(
      communityRepositoryInMemory,
    );
  });

  it("Should be able to found community by id", async () => {
    const user = makeUser({
      password_hash: "123456",
    });

    const community = await createCommunityUseCase.execute({
      founder_id: user.id,
      key_access: "false",
      description: "test",
      name: "GuiiosCommunity",
    });

    const communityFound = await findCommunityById.execute(community.id);

    expect(community).toEqual(communityFound);
  });
});
