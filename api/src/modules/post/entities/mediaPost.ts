import { randomUUID } from "crypto";

interface PostSchema {
  title: string;
  user_id: string;
  community_id: string;
  media?: string;
  id?: string;
  created_at?: Date;
}

export class MediaPost {
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

  set community_id(community_id: string) {
    this.props.community_id = community_id;
  }

  get community_id(): string {
    return this.props.community_id;
  }

  get media(): string {
    return this.props.media;
  }

  set media(media: string) {
    this.props.media = media;
  }

  get created_at(): Date {
    return this.props.created_at;
  }
}
