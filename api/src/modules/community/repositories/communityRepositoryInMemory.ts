import { User } from "src/modules/user/entities/User";
import { Community } from "../entities/community";
import {
  CommunityRepository,
  CommunityResponseForIdRequest,
} from "./communityRepository";

export class CommunityRepositoryInMemory implements CommunityRepository {
  public communities: Community[] = [];
  public users: User[] = [];

  async findById(
    id: string,
  ): Promise<Community | CommunityResponseForIdRequest | null> {
    const community = this.communities.find((community) => community.id === id);

    if (!community) {
      return null;
    }

    return community;
  }

  async findAllCommunities(): Promise<Community[]> {
    return this.communities;
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

    if (community.key_access === "true" && community.password !== password) {
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

    if (community.key_access === "true" && community.password === password) {
      community.addUser(user);
    }

    if (community.key_access === "false" && !password) {
      community.addUser(user);
    }
  }

  async leaveCommunity(userId: string, communityId: string): Promise<void> {
    const community = this.communities.find(
      (community) => community.id === communityId,
    );

    const communityIndex = this.communities.findIndex(
      (community) => community.id === communityId,
    );

    if (!community) {
      throw new Error("A comunidade não existe!");
    }

    const user = this.users.find((user) => user.id === userId);

    if (!user) {
      throw new Error("Usuário não existe!");
    }

    const isMember = community.User_Members.find(
      (member) => member.id === user.id,
    );

    if (!isMember) {
      throw new Error("Não faz parte da comunidade!");
    }

    community.removeUser(user.id);

    this.communities[communityIndex] = community;
  }
}
