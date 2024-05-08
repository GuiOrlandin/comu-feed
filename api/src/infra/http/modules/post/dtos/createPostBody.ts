import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreatePostBody {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  community_id: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  media: string;
}
