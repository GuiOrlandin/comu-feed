import { randomUUID } from "crypto";

interface PostSchema {
  title: string;
  user_id: string;
  comments?: string;
  love?: number;
  content: string | File;
  id?: string;
  created_at?: Date;
}

export class Post {
  private props: PostSchema;

  constructor(props: PostSchema) {
    this.props = {
      ...props,
      created_at: props.created_at || new Date(),
      id: props.id || randomUUID(),
    };
  }

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get user_id(): string {
    return this.props.user_id;
  }

  set user_id(user_id: string) {
    this.props.user_id = user_id;
  }

  get comments(): string {
    return this.props.comments;
  }

  set comments(comments: string) {
    this.props.comments = comments;
  }

  get content(): string | File {
    return this.props.content;
  }

  set content(content: string | File) {
    this.props.content = content;
  }

  get love(): number {
    return this.props.love;
  }

  set love(love: number) {
    this.props.love = love;
  }

  get created_at(): Date {
    return this.props.created_at;
  }
}
