import { CreateCommunityUseCase } from "./createCommunityUseCase";
import { CommunityRepositoryInMemory } from "../repositories/communityRepositoryInMemory";
import { makeUser } from "src/modules/user/factories/userFactory";
import { DeleteCommunityUseCase } from "./deleteCommunityUseCase";

let createCommunityUseCase: CreateCommunityUseCase;
let communityRepositoryInMemory: CommunityRepositoryInMemory;
let deleteCommunityUseCase: DeleteCommunityUseCase;

describe("Delete Community", () => {
  beforeEach(() => {
    communityRepositoryInMemory = new CommunityRepositoryInMemory();
    createCommunityUseCase = new CreateCommunityUseCase(
      communityRepositoryInMemory,
    );
    deleteCommunityUseCase = new DeleteCommunityUseCase(
      communityRepositoryInMemory,
    );
  });

  it("Should be able to delete an community", async () => {
    const user = makeUser({
      password_hash: "123456",
    });

    const community = await createCommunityUseCase.execute({
      founder_id: user.id,
      key_access: false,
      name: "GuiiosCommunity",
    });

    await deleteCommunityUseCase.execute({
      community_id: community.id,
      user_id: user.id,
    });

    expect(communityRepositoryInMemory.communities).toEqual([]);
  });
});
