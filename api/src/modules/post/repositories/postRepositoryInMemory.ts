import { MediaPost } from "../entities/mediaPost";
import { TextPost } from "../entities/textPost";
import {
  MediaPostWithUser,
  PostRepository,
  TextPostWithUser,
} from "./postRepository";

export class PostRepositoryInMemory implements PostRepository {
  public post: (TextPost | MediaPost)[] = [];

  async findById(id: string): Promise<TextPost | MediaPost | null> {
    const post = this.post.find((post) => post.id === id);

    if (!post) {
      return null;
    }

    return post;
  }

  findAllPosts(): Promise<(TextPostWithUser | MediaPostWithUser)[]> {
    const allPosts = this.post;

    return Promise.resolve(allPosts);
  }

  async delete(id: string): Promise<void> {
    this.post = this.post.filter((post) => post.id !== id);
  }

  async create(post: TextPost | MediaPost): Promise<void> {
    this.post.push(post);
  }

  async save(post: TextPost | MediaPost): Promise<void> {
    const postIndex = this.post.findIndex(
      (currentPost) => currentPost.id === post.id,
    );

    if (postIndex >= 0) {
      this.post[postIndex] = post;
    }
  }
}
