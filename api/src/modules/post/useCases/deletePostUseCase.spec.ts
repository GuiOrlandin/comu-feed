import { makeUser } from "src/modules/user/factories/userFactory";
import { PostRepositoryInMemory } from "../repositories/postRepositoryInMemory";
import { CreatePostUseCase } from "./createPostUseCase";
import { DeletePostUseCase } from "./deletePostUseCase";

let deletePostUseCase: DeletePostUseCase;
let createPostUseCase: CreatePostUseCase;
let postRepositoryInMemory: PostRepositoryInMemory;

describe("Delete post", () => {
  beforeEach(() => {
    postRepositoryInMemory = new PostRepositoryInMemory();
    deletePostUseCase = new DeletePostUseCase(postRepositoryInMemory);
    createPostUseCase = new CreatePostUseCase(postRepositoryInMemory);
  });

  it("Should be able to delete post", async () => {
    const user = makeUser({
      password_hash: "123456",
    });

    const post = await createPostUseCase.execute({
      content: "Adicionando Conteudo",
      title: "Test",
      user_id: user.id,
    });

    await deletePostUseCase.execute({
      post_id: post.id,
    });

    expect(postRepositoryInMemory.post).toEqual([]);
  });
});
