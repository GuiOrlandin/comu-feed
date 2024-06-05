import { makeUser } from "src/modules/user/factories/userFactory";
import { CommunityRepositoryInMemory } from "src/modules/community/repositories/communityRepositoryInMemory";
import { CreateCommunityUseCase } from "src/modules/community/useCases/createCommunityUseCase";
import { DeleteLoveInThePostUseCase } from "./DeleteLoveInThePostUseCase";
import { CreatePostUseCase } from "src/modules/post/useCases/createPostUseCase";
import { PostRepositoryInMemory } from "src/modules/post/repositories/postRepositoryInMemory";
import { LoveRepositoryInMemory } from "../repositories/loveRepositoryInMemory";
import { CreateLoveInThePostUseCase } from "./createLoveInThePostUseCase";

let createPostUseCase: CreatePostUseCase;
let postRepositoryInMemory: PostRepositoryInMemory;
let communityRepositoryInMemory: CommunityRepositoryInMemory;
let createCommunityUseCase: CreateCommunityUseCase;
let loveRepositoryInMemory: LoveRepositoryInMemory;
let createLoveInThePostUseCase: CreateLoveInThePostUseCase;
let deleteLoveInThePostUseCase: DeleteLoveInThePostUseCase;

describe("Delete The the post", () => {
  beforeEach(() => {
    postRepositoryInMemory = new PostRepositoryInMemory();
    loveRepositoryInMemory = new LoveRepositoryInMemory();
    communityRepositoryInMemory = new CommunityRepositoryInMemory();
    createCommunityUseCase = new CreateCommunityUseCase(
      communityRepositoryInMemory,
    );
    createPostUseCase = new CreatePostUseCase(postRepositoryInMemory);
    createLoveInThePostUseCase = new CreateLoveInThePostUseCase(
      loveRepositoryInMemory,
    );
    deleteLoveInThePostUseCase = new DeleteLoveInThePostUseCase(
      loveRepositoryInMemory,
    );
  });

  it("Should be able to love the post", async () => {
    const user = makeUser({
      password_hash: "123456",
    });

    const community = await createCommunityUseCase.execute({
      founder_id: user.id,
      key_access: "false",
      description: "test",
      name: "GuiiosCommunity",
    });

    const post = await createPostUseCase.execute({
      community_id: community.id,
      content: "conteudo do post",
      title: "titulo do post",
      user_id: user.id,
      postType: "textPost",
    });

    const love = await createLoveInThePostUseCase.execute({
      text_post_id: post.id,
      user_id: user.id,
      postType: "textPost",
    });

    await deleteLoveInThePostUseCase.execute({
      love_id: love.id,
    });

    expect(loveRepositoryInMemory.love).toEqual([]);
  });
});
