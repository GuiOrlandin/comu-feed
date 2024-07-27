import { IsString, IsOptional } from "class-validator";

export class SignInWithGoogleEmailBody {
  @IsString()
  @IsOptional()
  emailOfUserLoggedWithGoogle: string;
}
