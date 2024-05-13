import { IsString, IsOptional } from "class-validator";

export class EditPostBody {
  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  title: string;
}
