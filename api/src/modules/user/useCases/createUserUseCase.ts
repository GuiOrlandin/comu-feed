import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/userRepository";
import { User } from "../entities/User";
import { hash } from "bcrypt";

interface CreatedUserRequest {
  email: string;
  name: string;
  password_hash: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, name, password_hash }: CreatedUserRequest) {
    const user = new User({
      email,
      name,
      password_hash: await hash(password_hash, 10),
    });

    this.userRepository.create(user);

    return user;
  }
}
