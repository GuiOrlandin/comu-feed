import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class CreateCommentBody {
  @IsString()
  @IsOptional()
  media_post_id: string;

  @IsString()
  @IsOptional()
  text_post_id: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
