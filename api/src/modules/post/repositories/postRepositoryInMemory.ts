import { Post } from "../entities/textPost";
import { PostNotFoundException } from "../exceptions/postNotFoundException";
import { PostRepository } from "./postRepository";

export class PostRepositoryInMemory implements PostRepository {
  public post: Post[] = [];

  async findById(id: string): Promise<Post | null> {
    const post = this.post.find((post) => post.id === id);

    if (!post) {
      return null;
    }

    return post;
  }

  async delete(id: string): Promise<void> {
    this.post = this.post.filter((post) => post.id !== id);
  }

  async create(post: Post): Promise<void> {
    this.post.push(post);
  }

  async save(post: Post): Promise<void> {
    const postIndex = this.post.findIndex(
      (currentNote) => currentNote.id === post.id,
    );

    if (postIndex >= 0) {
      this.post[postIndex] = post;
    }
  }
}
