import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class CreateCommunityBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  key_access: boolean;

  @IsString()
  @IsOptional()
  password: string;
}
