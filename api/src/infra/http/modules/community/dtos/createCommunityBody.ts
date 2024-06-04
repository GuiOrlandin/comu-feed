import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class CreateCommunityBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  key_access: string;

  @IsString()
  @IsOptional()
  password: string;
}
