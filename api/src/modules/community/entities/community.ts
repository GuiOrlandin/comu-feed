import { randomUUID } from "crypto";

interface CommunitySchema {
  name: string;
  id?: string;
  founder_id: string;
  key_access: boolean;
  created_at?: Date;
  password?: string;
  User_Members?: string[];
}

export class Community {
  private props: CommunitySchema;

  constructor(props: CommunitySchema) {
    this.props = {
      ...props,
      created_at: props.created_at || new Date(),
      id: props.id || randomUUID(),
      User_Members: props.User_Members || [],
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

  get User_Members(): string[] {
    return this.props.User_Members;
  }

  set User_Members(User_Member: string) {
    this.props.User_Members.push(...User_Member);
  }

  get created_at(): Date {
    return this.props.created_at;
  }
}
