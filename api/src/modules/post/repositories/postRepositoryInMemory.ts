import { Post } from "../entities/post";
import { PostRepository } from "./postRepository";

export class PostRepositoryInMemory implements PostRepository {
  public post: Post[] = [];

  async delete(id: string): Promise<void> {
    this.post = this.post.filter((community) => community.id !== id);
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
