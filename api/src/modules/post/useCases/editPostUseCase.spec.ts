import { makeUser } from "src/modules/user/factories/userFactory";
import { PostRepositoryInMemory } from "../repositories/postRepositoryInMemory";
import { CreatePostUseCase } from "./createPostUseCase";
import { DeletePostUseCase } from "./deletePostUseCase";
import { EditPostUseCase } from "./editPostUseCase";
import { CommunityRepositoryInMemory } from "src/modules/community/repositories/communityRepositoryInMemory";
import { CreateCommunityUseCase } from "src/modules/community/useCases/createCommunityUseCase";
import { postWithoutPermissionException } from "../exceptions/postWithoutPermissionException";

let deletePostUseCase: DeletePostUseCase;
let createPostUseCase: CreatePostUseCase;
let editPostUseCase: EditPostUseCase;
let postRepositoryInMemory: PostRepositoryInMemory;
let communityRepositoryInMemory: CommunityRepositoryInMemory;
let createCommunityUseCase: CreateCommunityUseCase;

describe("Edit post", () => {
  beforeEach(() => {
    postRepositoryInMemory = new PostRepositoryInMemory();
    deletePostUseCase = new DeletePostUseCase(postRepositoryInMemory);
    communityRepositoryInMemory = new CommunityRepositoryInMemory();
    createCommunityUseCase = new CreateCommunityUseCase(
      communityRepositoryInMemory,
    );
    createPostUseCase = new CreatePostUseCase(postRepositoryInMemory);
    editPostUseCase = new EditPostUseCase(postRepositoryInMemory);
  });

  it("Should be able to edit post", async () => {
    const user = makeUser({
      password_hash: "123456",
    });

    const community = await createCommunityUseCase.execute({
      founder_id: user.id,
      key_access: "false",
      name: "GuiiosCommunity",
      description: "test",
    });

    const post = await createPostUseCase.execute({
      community_id: community.id,
      content: "conteudo do post",
      title: "titulo do post",
      user_id: user.id,
      postType: "textPost",
    });

    const editedPost = await editPostUseCase.execute({
      content: "conteudo editado",
      post_id: post.id,
      title: "Titulo editado",
      user_id: user.id,
    });

    expect(postRepositoryInMemory.post).toEqual([editedPost]);
  });

  it("Should not be able to edit post if the user is not the creator", async () => {
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

    await expect(
      editPostUseCase.execute({
        content: "conteudo editado",
        post_id: post.id,
        title: "Titulo editado",
        user_id: "user.id",
      }),
    ).rejects.toThrow(postWithoutPermissionException);
  });

  it("Should not be able to edit post if the user is not the creator", async () => {
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

    await expect(
      editPostUseCase.execute({
        content: "conteudo editado",
        post_id: post.id,
        title: "Titulo editado",
        user_id: "user.id",
      }),
    ).rejects.toThrow(postWithoutPermissionException);
  });
});
