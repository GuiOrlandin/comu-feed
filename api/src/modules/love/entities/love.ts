import { randomUUID } from "crypto";

interface PostSchema {
  user_id: string;
  post_id: string;
  id?: string;
}

export class Love {
  private props: PostSchema;

  constructor(props: PostSchema) {
    this.props = {
      ...props,
      id: props.id || randomUUID(),
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

  set post_id(post_id: string) {
    this.props.post_id = post_id;
  }

  get post_id(): string {
    return this.props.post_id;
  }
}
