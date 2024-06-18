import { makeUser } from "src/modules/user/factories/userFactory";
import { PostRepositoryInMemory } from "../repositories/postRepositoryInMemory";
import { CreatePostUseCase } from "./createPostUseCase";
import { CommunityRepositoryInMemory } from "src/modules/community/repositories/communityRepositoryInMemory";
import { CreateCommunityUseCase } from "src/modules/community/useCases/createCommunityUseCase";
import { FindAllPostsUseCase } from "./findAllPostsUseCase";

let createPostUseCase: CreatePostUseCase;
let communityRepositoryInMemory: CommunityRepositoryInMemory;
let postRepositoryInMemory: PostRepositoryInMemory;
let createCommunityUseCase: CreateCommunityUseCase;
let findAllPostsUseCase: FindAllPostsUseCase;

describe("Find all posts", () => {
  beforeEach(() => {
    postRepositoryInMemory = new PostRepositoryInMemory();
    communityRepositoryInMemory = new CommunityRepositoryInMemory();
    createPostUseCase = new CreatePostUseCase(postRepositoryInMemory);
    createCommunityUseCase = new CreateCommunityUseCase(
      communityRepositoryInMemory,
    );
    findAllPostsUseCase = new FindAllPostsUseCase(postRepositoryInMemory);
  });

  it("Should be able to find all posts", async () => {
    const user = makeUser({
      password_hash: "123456",
    });

    const community = await createCommunityUseCase.execute({
      founder_id: user.id,
      key_access: "false",
      description: "test",
      name: "GuiiosCommunity",
    });

    const post1 = await createPostUseCase.execute({
      community_id: community.id,
      content: "conteudo do post",
      title: "titulo do post",
      user_id: user.id,
      postType: "textPost",
    });
    const post2 = await createPostUseCase.execute({
      community_id: community.id,
      content: "conteudo do post",
      title: "titulo do post",
      user_id: user.id,
      postType: "mediaPost",
      media: "test.svg",
    });

    const response = await findAllPostsUseCase.execute();

    console.log(response);

    await expect(response).toEqual([post1, post2]);
  });
});
