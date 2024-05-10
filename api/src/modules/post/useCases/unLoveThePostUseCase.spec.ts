import { makeUser } from "src/modules/user/factories/userFactory";
import { PostRepositoryInMemory } from "../repositories/postRepositoryInMemory";
import { CreatePostUseCase } from "./createPostUseCase";
import { DeletePostUseCase } from "./deletePostUseCase";
import { CommunityRepositoryInMemory } from "src/modules/community/repositories/communityRepositoryInMemory";
import { CreateCommunityUseCase } from "src/modules/community/useCases/createCommunityUseCase";
import { LoveThePostUseCase } from "./loveThePostUseCase";
import { UnLoveThePostUseCase } from "./unLoveThePostUseCase";

let deletePostUseCase: DeletePostUseCase;
let createPostUseCase: CreatePostUseCase;
let postRepositoryInMemory: PostRepositoryInMemory;
let communityRepositoryInMemory: CommunityRepositoryInMemory;
let createCommunityUseCase: CreateCommunityUseCase;
let loveThePostUseCase: LoveThePostUseCase;
let unloveThePostUseCase: UnLoveThePostUseCase;

describe("'UnLove' the post", () => {
  beforeEach(() => {
    postRepositoryInMemory = new PostRepositoryInMemory();
    deletePostUseCase = new DeletePostUseCase(postRepositoryInMemory);
    communityRepositoryInMemory = new CommunityRepositoryInMemory();
    createCommunityUseCase = new CreateCommunityUseCase(
      communityRepositoryInMemory,
    );
    createPostUseCase = new CreatePostUseCase(postRepositoryInMemory);
    loveThePostUseCase = new LoveThePostUseCase(postRepositoryInMemory);
    unloveThePostUseCase = new UnLoveThePostUseCase(postRepositoryInMemory);
  });

  it("Should be able to 'unlove' the post", async () => {
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
      postType: "textPost",
    });

    await loveThePostUseCase.execute({
      post_id: post.id,
    });

    await loveThePostUseCase.execute({
      post_id: post.id,
    });

    await unloveThePostUseCase.execute({
      post_id: post.id,
    });

    expect(post.love).toEqual(1);
  });
});
