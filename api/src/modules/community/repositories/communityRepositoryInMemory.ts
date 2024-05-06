import { User } from "src/modules/user/entities/User";
import { Community } from "../entities/community";
import { CommunityRepository } from "./communityRepository";

export class CommunityRepositoryInMemory implements CommunityRepository {
  public communities: Community[] = [];
  public users: User[] = [];

  async findById(id: string): Promise<Community | null> {
    const community = this.communities.find((community) => community.id === id);

    if (!community) {
      return null;
    }

    return community;
  }

  async findByName(name: string): Promise<Community | null> {
    const regex = new RegExp(name, "i");

    const community = this.communities.find((community) =>
      regex.test(community.name),
    );

    if (!community) {
      return null;
    }

    return community;
  }

  async create(community: Community): Promise<void> {
    this.communities.push(community);
  }

  async createUser(user: User): Promise<void> {
    this.users.push(user);
  }

  async delete(id: string): Promise<void> {
    this.communities = this.communities.filter(
      (community) => community.id !== id,
    );
  }

  async joinTheCommunity(
    userId: string,
    communityId: string,
    password?: string,
  ): Promise<void> {
    const community = this.communities.find(
      (community) => community.id === communityId,
    );

    if (!community) {
      throw new Error("A comunidade não existe!");
    }

    if (community.key_access && community.password !== password) {
      throw new Error("Senha incorreta!");
    }

    const user = this.users.find((user) => user.id === userId);

    if (!user) {
      throw new Error("Usuário não existe!");
    }

    const isMember = community.User_Members.find(
      (member) => member.id === user.id,
    );

    if (isMember) {
      throw new Error("Você já é membro da comunidade!");
    }

    if (community.key_access && community.password === password) {
      community.User_Members.push(user);
    }

    if (!community.key_access && !password) {
      community.User_Members.push(user);
    }
  }

  //   findManyPostsByCommunity(
  //     communityId: string,
  //     page: number,
  //     perPage: number,
  //   ): Promise<Community[]> {
  //     const community = this.communities.find(
  //       (community) => community.id === communityId,
  //     );

  //     if (!community) {
  //       return null;
  //     }

  //     return community;
  //   }
}
