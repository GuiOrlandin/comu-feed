import { Love } from "../entities/love";
import { LoveRepository } from "./loveRepository";

export class LoveRepositoryInMemory implements LoveRepository {
  public love: Love[] = [];

  async create(love: Love): Promise<void> {
    this.love.push(love);
  }

  async checkUserLikedThePostByUserId(user_id: string): Promise<boolean> {
    const userLoved = await this.love.find((love) => love.user_id === user_id);

    if (userLoved) {
      return true;
    }

    return false;
  }

  async delete(id: string): Promise<void> {
    this.love = this.love.filter((love) => love.id !== id);
  }

  async findById(love_id: string): Promise<Love | null> {
    const love = this.love.find((love) => love.id === love_id);

    if (!love) {
      return null;
    }

    return love;
  }
}
