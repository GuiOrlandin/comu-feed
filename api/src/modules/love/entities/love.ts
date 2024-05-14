import { randomUUID } from "crypto";

interface LoveSchema {
  id?: string;
  user_id: string;
  text_post_id?: string;
  media_post_id?: string;
}

export class Love {
  private props: LoveSchema;

  constructor(props: LoveSchema) {
    this.props = {
      ...props,
      id: props.id || randomUUID(),
      text_post_id: props.text_post_id || null,
      media_post_id: props.media_post_id || null,
    };
  }

  get id(): string {
    return this.props.id;
  }

  get user_id(): string {
    return this.props.user_id;
  }

  set user_id(user_id: string) {
    this.props.user_id = user_id;
  }

  set text_post_id(text_post_id: string) {
    this.props.text_post_id = text_post_id;
  }

  get text_post_id(): string {
    return this.props.text_post_id;
  }
  set media_post_id(media_post_id: string) {
    this.props.media_post_id = media_post_id;
  }

  get media_post_id(): string {
    return this.props.media_post_id;
  }
}
