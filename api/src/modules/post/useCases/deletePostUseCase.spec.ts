import { makeUser } from "src/modules/user/factories/userFactory";
import { PostRepositoryInMemory } from "../repositories/postRepositoryInMemory";
import { CreatePostUseCase } from "./createPostUseCase";
import { DeletePostUseCase } from "./deletePostUseCase";
import { CreateCommunityUseCase } from "src/modules/community/useCases/createCommunityUseCase";
import { CommunityRepositoryInMemory } from "src/modules/community/repositories/communityRepositoryInMemory";
import { postWithoutPermissionException } from "../exceptions/postWithoutPermissionException";
import { PostNotFoundException } from "../exceptions/postNotFoundException";

let deletePostUseCase: DeletePostUseCase;
let createPostUseCase: CreatePostUseCase;
let communityRepositoryInMemory: CommunityRepositoryInMemory;
let postRepositoryInMemory: PostRepositoryInMemory;
let createCommunityUseCase: CreateCommunityUseCase;

describe("Delete post", () => {
  beforeEach(() => {
    communityRepositoryInMemory = new CommunityRepositoryInMemory();
    postRepositoryInMemory = new PostRepositoryInMemory();
    deletePostUseCase = new DeletePostUseCase(postRepositoryInMemory);
    createCommunityUseCase = new CreateCommunityUseCase(
      communityRepositoryInMemory,
    );
    createPostUseCase = new CreatePostUseCase(
      postRepositoryInMemory,
    );
  });

  it("Should be able to delete post", async () => {
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
      postType: "textPost",
      user_id: user.id,
    });

    await deletePostUseCase.execute({
      post_id: post.id,
      userId: user.id,
    });

    expect(postRepositoryInMemory.post).toEqual([]);
  });

  it("Should not be able to delete post if the user is not the creator", async () => {
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

    await expect(
      deletePostUseCase.execute({
        post_id: post.id,
        userId: "user.id",
      }),
    ).rejects.toThrow(postWithoutPermissionException);
  });

  it("Should not be able to delete post if the post id is not the correct", async () => {
    const user = makeUser({
      password_hash: "123456",
    });

    const community = await createCommunityUseCase.execute({
      founder_id: user.id,
      key_access: false,
      name: "GuiiosCommunity",
    });

    await createPostUseCase.execute({
      community_id: community.id,
      content: "conteudo do post",
      title: "titulo do post",
      user_id: user.id,
      postType: "textPost",
    });

    await expect(
      deletePostUseCase.execute({
        post_id: "post.id",
        userId: user.id,
      }),
    ).rejects.toThrow(PostNotFoundException);
  });
});
