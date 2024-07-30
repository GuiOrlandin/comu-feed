import { CreateCommunityUseCase } from "./createCommunityUseCase";
import { CommunityRepositoryInMemory } from "../repositories/communityRepositoryInMemory";
import { makeUser } from "src/modules/user/factories/userFactory";
import { JoinTheCommunityUseCase } from "./joinTheCommunityUseCase";
import { LeaveCommunityUseCase } from "./leaveCommunityUseCase";

let createCommunityUseCase: CreateCommunityUseCase;
let communityRepositoryInMemory: CommunityRepositoryInMemory;
let leaveCommunityUseCase: LeaveCommunityUseCase;
let joinTheCommunityUseCase: JoinTheCommunityUseCase;

describe("Leave Community", () => {
  beforeEach(() => {
    communityRepositoryInMemory = new CommunityRepositoryInMemory();
    createCommunityUseCase = new CreateCommunityUseCase(
      communityRepositoryInMemory,
    );

    joinTheCommunityUseCase = new JoinTheCommunityUseCase(
      communityRepositoryInMemory,
    );
    leaveCommunityUseCase = new LeaveCommunityUseCase(
      communityRepositoryInMemory,
    );
  });

  it("Should be able to leave community", async () => {
    const user = makeUser({
      password_hash: "123456",
    });

    await communityRepositoryInMemory.createUser(user);

    const community = await createCommunityUseCase.execute({
      founder_id: user.id,
      key_access: "false",
      description: "test",
      name: "GuiiosCommunity",
    });

    await joinTheCommunityUseCase.execute({
      communityId: community.id,
      userId: user.id,
    });

    const test = await leaveCommunityUseCase.execute({
      communityId: community.id,
      userId: user.id,
    });

    expect(community.User_Members).toEqual([]);
  });
});
