import { makeUser } from "src/modules/user/factories/userFactory";
import { PostRepositoryInMemory } from "../repositories/postRepositoryInMemory";
import { CreatePostUseCase } from "./createPostUseCase";

let createPostUseCase: CreatePostUseCase;
let postRepositoryInMemory: PostRepositoryInMemory;

describe("Create post", () => {
  beforeEach(() => {
    postRepositoryInMemory = new PostRepositoryInMemory();
    createPostUseCase = new CreatePostUseCase(postRepositoryInMemory);
  });

  it("Should be able to create an post", async () => {
    const user = makeUser({
      password_hash: "123456",
    });

    const post = await createPostUseCase.execute({
      content: "Adicionando Conteudo",
      title: "Test",
      user_id: user.id,
    });

    console.log(postRepositoryInMemory.post);

    expect(postRepositoryInMemory.post).toEqual([post]);
  });
});
