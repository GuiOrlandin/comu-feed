import { IsString, IsOptional } from "class-validator";

export class EditUserBody {
  @IsString()
  @IsOptional()
  name?: string;
}
