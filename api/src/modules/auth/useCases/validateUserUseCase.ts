import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcrypt";
import { UserRepository } from "src/modules/user/repositories/userRepository";

interface ValidateUserRequest {
  email: string;
  password_hash: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password_hash }: ValidateUserRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Email ou senha incorretos");
    }

    const isPasswordMatched = await compare(password_hash, user.password_hash);

    if (!isPasswordMatched) {
      throw new UnauthorizedException("Email ou senha incorretos!");
    }

    return user;
  }
}
