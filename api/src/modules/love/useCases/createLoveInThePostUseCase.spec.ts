import { makeUser } from "src/modules/user/factories/userFactory";
import { CommunityRepositoryInMemory } from "src/modules/community/repositories/communityRepositoryInMemory";
import { CreateCommunityUseCase } from "src/modules/community/useCases/createCommunityUseCase";
import { DeletePostUseCase } from "src/modules/post/useCases/deletePostUseCase";
import { CreatePostUseCase } from "src/modules/post/useCases/createPostUseCase";
import { PostRepositoryInMemory } from "src/modules/post/repositories/postRepositoryInMemory";
import { CreateLoveInThePostUseCase } from "./createLoveInThePostUseCase";
import { LoveRepositoryInMemory } from "../repositories/loveRepositoryInMemory";
import { DeleteLoveInThePostUseCase } from "./DeleteLoveInThePostUseCase";

let deletePostUseCase: DeletePostUseCase;
let createPostUseCase: CreatePostUseCase;
let postRepositoryInMemory: PostRepositoryInMemory;
let loveRepositoryInMemory: LoveRepositoryInMemory;
let communityRepositoryInMemory: CommunityRepositoryInMemory;
let createCommunityUseCase: CreateCommunityUseCase;
let createLoveInThePostUseCase: CreateLoveInThePostUseCase;

describe("Create Love in the post", () => {
  beforeEach(() => {
    postRepositoryInMemory = new PostRepositoryInMemory();
    loveRepositoryInMemory = new LoveRepositoryInMemory();
    deletePostUseCase = new DeletePostUseCase(postRepositoryInMemory);
    communityRepositoryInMemory = new CommunityRepositoryInMemory();
    createCommunityUseCase = new CreateCommunityUseCase(
      communityRepositoryInMemory,
    );
    createPostUseCase = new CreatePostUseCase(postRepositoryInMemory);
    createLoveInThePostUseCase = new CreateLoveInThePostUseCase(
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

    expect(love.text_post_id).toEqual(post.id);
  });
});
