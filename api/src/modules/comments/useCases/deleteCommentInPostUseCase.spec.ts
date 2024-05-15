import { CommunityRepositoryInMemory } from "src/modules/community/repositories/communityRepositoryInMemory";
import { CreateCommunityUseCase } from "src/modules/community/useCases/createCommunityUseCase";
import { PostRepositoryInMemory } from "src/modules/post/repositories/postRepositoryInMemory";
import { CreatePostUseCase } from "src/modules/post/useCases/createPostUseCase";
import { makeUser } from "src/modules/user/factories/userFactory";
import { CreateCommentInThePostUseCase } from "./createCommentUseCase";
import { CommentRepositoryInMemory } from "../repositories/commentRepositoryInMemory";
import { DeleteCommentInThePostUseCase } from "./deleteCommentInPostUseCase";

let createPostUseCase: CreatePostUseCase;
let postRepositoryInMemory: PostRepositoryInMemory;
let communityRepositoryInMemory: CommunityRepositoryInMemory;
let commentRepositoryInMemory: CommentRepositoryInMemory;
let createCommunityUseCase: CreateCommunityUseCase;
let createCommentInThePostUseCase: CreateCommentInThePostUseCase;
let deleteCommentInThePostUseCase: DeleteCommentInThePostUseCase;

describe("Delete comment in the post", () => {
  beforeEach(() => {
    postRepositoryInMemory = new PostRepositoryInMemory();
    communityRepositoryInMemory = new CommunityRepositoryInMemory();
    commentRepositoryInMemory = new CommentRepositoryInMemory();
    createCommunityUseCase = new CreateCommunityUseCase(
      communityRepositoryInMemory,
    );
    createPostUseCase = new CreatePostUseCase(postRepositoryInMemory);
    createCommentInThePostUseCase = new CreateCommentInThePostUseCase(
      commentRepositoryInMemory,
    );
    deleteCommentInThePostUseCase = new DeleteCommentInThePostUseCase(
      commentRepositoryInMemory,
    );
  });

  it("Should be able to love the post", async () => {
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

    const comment = await createCommentInThePostUseCase.execute({
      media_post_id: post.id,
      user_id: user.id,
      postType: "mediaPost",
      content: "Muito bom post!",
    });

    await deleteCommentInThePostUseCase.execute({ comment_id: comment.id });

    expect(commentRepositoryInMemory.comments).toEqual([]);
  });
});
