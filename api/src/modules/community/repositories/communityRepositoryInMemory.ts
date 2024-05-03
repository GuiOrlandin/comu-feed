import { Community } from "../entities/community";
import { CommunityRepository } from "./communityRepository";

export class CommunityRepositoryInMemory implements CommunityRepository {
  public communities: Community[] = [];

  async findById(id: string): Promise<Community | null> {
    const community = this.communities.find((community) => community.id === id);

    if (!community) {
      return null;
    }

    return community;
  }

  async findByName(name: string): Promise<Community | null> {
    const community = this.communities.find(
      (community) => community.name === name,
    );

    if (!community) {
      return null;
    }

    return community;
  }

  async create(community: Community): Promise<void> {
    this.communities.push(community);
  }

  async delete(id: string): Promise<void> {
    this.communities = this.communities.filter(
      (community) => community.id !== id,
    );
  }

  async enterInCommunity(
    userId: string,
    communityId: string,
    password: string,
  ): Promise<void> {
    const community = this.communities.find(
      (community) => community.id === communityId,
    );

    if (!community) {
      throw new Error("A comunidade não existe!");
    }

    if (
      community.key_access &&
      (!password || community.password !== password)
    ) {
      throw new Error("Senha incorreta!");
    }

    const isMember = community.User_Members.find((member) => member === userId);

    if (isMember) {
      throw new Error("Você já é membro da comunidade!");
    }

    if (community.key_access && community.password === password) {
      community.User_Members.push(userId);
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
