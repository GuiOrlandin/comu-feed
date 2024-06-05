import { CreateCommunityUseCase } from "./createCommunityUseCase";
import { CommunityRepositoryInMemory } from "../repositories/communityRepositoryInMemory";
import { makeUser } from "src/modules/user/factories/userFactory";
import { FindCommunityByNameUseCase } from "./findCommunityByNameUseCase";

let createCommunityUseCase: CreateCommunityUseCase;
let communityRepositoryInMemory: CommunityRepositoryInMemory;
let findCommunityByName: FindCommunityByNameUseCase;

describe("Find Community by name", () => {
  beforeEach(() => {
    communityRepositoryInMemory = new CommunityRepositoryInMemory();
    createCommunityUseCase = new CreateCommunityUseCase(
      communityRepositoryInMemory,
    );
    findCommunityByName = new FindCommunityByNameUseCase(
      communityRepositoryInMemory,
    );
  });

  it("Should be able to found community by name", async () => {
    const user = makeUser({
      password_hash: "123456",
    });

    const community = await createCommunityUseCase.execute({
      founder_id: user.id,
      key_access: "false",
      description: "test",
      name: "GuiiosCommunity",
    });

    const communityFound = await findCommunityByName.execute(community.name);

    expect(community).toEqual(communityFound);
  });

  it("Should be able to find community by name or by name's characteristics", async () => {
    const user = makeUser({
      password_hash: "123456",
    });

    await createCommunityUseCase.execute({
      founder_id: user.id,
      key_access: "false",
      description: "test",
      name: "GuiiosCommunity",
    });

    await createCommunityUseCase.execute({
      founder_id: user.id,
      key_access: "false",
      description: "test",
      name: "GuiiosCommunity2",
    });

    const communityFound = await findCommunityByName.execute("guiios");

    if (Array.isArray(communityFound)) {
      expect(communityFound.length).toEqual(2);
    }
  });
});
