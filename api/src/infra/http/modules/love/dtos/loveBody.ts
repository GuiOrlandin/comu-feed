import { IsString, IsOptional } from "class-validator";

export class CreateLoveBody {
  @IsString()
  @IsOptional()
  media_post_id: string;

  @IsString()
  @IsOptional()
  text_post_id: string;
}
