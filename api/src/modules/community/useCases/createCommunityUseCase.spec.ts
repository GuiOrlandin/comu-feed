import { UserRepositoryInMemory } from "src/modules/user/repositories/userRepositoryInMemory";
import { CreateUserUseCase } from "src/modules/user/useCases/createUserUseCase";
import { CreateCommunityUseCase } from "./createCommunityUseCase";
import { CommunityRepositoryInMemory } from "../repositories/communityRepositoryInMemory";

let createUserUseCase: CreateUserUseCase;
let createCommunityUseCase: CreateCommunityUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let communityRepositoryInMemory: CommunityRepositoryInMemory;

describe("Create User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    communityRepositoryInMemory = new CommunityRepositoryInMemory();
    createCommunityUseCase = new CreateCommunityUseCase(
      communityRepositoryInMemory,
    );
  });

  it("Should be able to create an user", async () => {
    const user = await createUserUseCase.execute({
      email: "guiorlandin@gmail.com",
      name: "Guilherme",
      password_hash: "123456",
    });

    const community = await createCommunityUseCase.execute({
      founder_id: user.id,
      key_access: false,
      name: "GuiiosCommunity",
    });

    console.log(communityRepositoryInMemory.communities);
    expect(communityRepositoryInMemory.communities).toEqual([community]);
  });
});
