import { makeUser } from "src/modules/user/factories/userFactory";
import { PostRepositoryInMemory } from "../repositories/postRepositoryInMemory";
import { CreatePostUseCase } from "./createPostUseCase";
import { CommunityRepositoryInMemory } from "src/modules/community/repositories/communityRepositoryInMemory";
import { CreateCommunityUseCase } from "src/modules/community/useCases/createCommunityUseCase";
import { postWithoutPermissionException } from "../exceptions/postWithoutPermissionException";

let createPostUseCase: CreatePostUseCase;
let communityRepositoryInMemory: CommunityRepositoryInMemory;
let postRepositoryInMemory: PostRepositoryInMemory;
let createCommunityUseCase: CreateCommunityUseCase;

describe("Create post", () => {
  beforeEach(() => {
    postRepositoryInMemory = new PostRepositoryInMemory();
    communityRepositoryInMemory = new CommunityRepositoryInMemory();
    createPostUseCase = new CreatePostUseCase(
      postRepositoryInMemory,
      communityRepositoryInMemory,
    );
    createCommunityUseCase = new CreateCommunityUseCase(
      communityRepositoryInMemory,
    );
  });

  it("Should be able to create an post", async () => {
    const user = makeUser({
      password_hash: "123456",
    });

    const community = await createCommunityUseCase.execute({
      founder_id: user.id,
      key_access: false,
      name: "GuiiosCommunity",
    });

    const post = await createPostUseCase.execute({
      community_id: community.id,
      content: "conteudo do post",
      title: "titulo do post",
      user_id: user.id,
    });

    expect(postRepositoryInMemory.post).toEqual([post]);
  });

  it("Should not be able to create an post with a wrong user id", async () => {
    const user = makeUser({
      password_hash: "123456",
    });

    const community = await createCommunityUseCase.execute({
      founder_id: user.id,
      key_access: false,
      name: "GuiiosCommunity",
    });

    await expect(
      createPostUseCase.execute({
        community_id: community.id,
        content: "conteudo do post",
        title: "titulo do post",
        user_id: "user.id",
      }),
    ).rejects.toThrow(postWithoutPermissionException);
  });
});
