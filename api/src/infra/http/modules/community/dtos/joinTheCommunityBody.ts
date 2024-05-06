import { IsString, IsOptional } from "class-validator";

export class JoinTheCommunityBody {
  @IsString()
  @IsOptional()
  password: string;
}
