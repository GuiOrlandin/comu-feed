import { CreateCommunityUseCase } from "./createCommunityUseCase";
import { CommunityRepositoryInMemory } from "../repositories/communityRepositoryInMemory";
import { makeUser } from "src/modules/user/factories/userFactory";
import { JoinTheCommunityUseCase } from "./joinTheCommunityUseCase";

let createCommunityUseCase: CreateCommunityUseCase;
let communityRepositoryInMemory: CommunityRepositoryInMemory;
let joinTheCommunityUseCase: JoinTheCommunityUseCase;

describe("Join the Community", () => {
  beforeEach(() => {
    communityRepositoryInMemory = new CommunityRepositoryInMemory();
    createCommunityUseCase = new CreateCommunityUseCase(
      communityRepositoryInMemory,
    );

    joinTheCommunityUseCase = new JoinTheCommunityUseCase(
      communityRepositoryInMemory,
    );
  });

  it("Should be able to join the community without password", async () => {
    const user = makeUser({
      password_hash: "123456",
    });

    await communityRepositoryInMemory.createUser(user);

    const community = await createCommunityUseCase.execute({
      founder_id: user.id,
      key_access: false,
      name: "GuiiosCommunity",
    });

    await joinTheCommunityUseCase.execute({
      communityId: community.id,
      userId: user.id,
    });

    expect(community.User_Members).toEqual([user]);
  });

  it("Should be able to join the community with password", async () => {
    const user = makeUser({
      password_hash: "123456",
    });

    await communityRepositoryInMemory.createUser(user);

    const community = await createCommunityUseCase.execute({
      founder_id: user.id,
      key_access: true,
      password: "123456",
      name: "GuiiosCommunity",
    });

    await joinTheCommunityUseCase.execute({
      communityId: community.id,
      userId: user.id,
      password: "123456",
    });

    expect(community.User_Members).toEqual([user]);
  });
});
