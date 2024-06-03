import { randomUUID } from "crypto";
import { User } from "src/modules/user/entities/User";

interface CommunitySchema {
  name: string;
  description: string;
  id?: string;
  founder_id: string;
  key_access: boolean;
  created_at?: Date;
  password?: string;
  community_image?: string | null;
  User_Members?: User[];
}

export class Community {
  private props: CommunitySchema;

  constructor(props: CommunitySchema) {
    this.props = {
      ...props,
      created_at: props.created_at || new Date(),
      id: props.id || randomUUID(),
      User_Members: props.User_Members || [],
      community_image: props.community_image || null,
    };
  }

  get id(): string {
    return this.props.id;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get founder_id(): string {
    return this.props.founder_id;
  }

  set founder_id(founder_id: string) {
    this.props.founder_id = founder_id;
  }
  get key_access(): boolean {
    return this.props.key_access;
  }

  set key_access(key_access: boolean) {
    this.props.key_access = key_access;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get User_Members(): User[] {
    return this.props.User_Members;
  }

  set User_Members(User_Member: User) {
    this.props.User_Members.push(User_Member);
  }
  get community_image(): string {
    return this.props.community_image;
  }

  set community_image(imageUrl: string) {
    this.props.community_image = imageUrl;
  }
  get description(): string {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get created_at(): Date {
    return this.props.created_at;
  }
}
