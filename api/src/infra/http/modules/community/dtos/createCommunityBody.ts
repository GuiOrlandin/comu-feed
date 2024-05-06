import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
} from "class-validator";

export class CreateCommunityBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  key_access: boolean;

  @IsString()
  @IsOptional()
  password: string;
}
