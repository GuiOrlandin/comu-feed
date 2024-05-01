import { UserRepositoryInMemory } from "src/modules/user/repositories/userRepositoryInMemory";
import { ValidateUserUseCase } from "./validateUserUseCase";
import { hash } from "bcrypt";
import { makeUser } from "src/modules/user/factories/userFactory";
import { UnauthorizedException } from "@nestjs/common";

let validateUserUseCase: ValidateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Validate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
  });

  it("Should be able to return user when credentials are correct", async () => {
    const userPasswordWithoutEncryption = "123456";

    const user = makeUser({
      password_hash: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    const result = await validateUserUseCase.execute({
      email: "guiorlandin@gmail.com",
      password: userPasswordWithoutEncryption,
    });

    expect(result).toEqual(user);
  });

  it("Should be able to throw error when credentials are incorrect", async () => {
    const userPasswordWithoutEncryption = "123456";

    const user = makeUser({
      password_hash: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    expect(async () => {
      await validateUserUseCase.execute({
        email: "incorrect@gmail.com",
        password: userPasswordWithoutEncryption,
      });
    }).rejects.toThrow(UnauthorizedException);

    expect(async () => {
      await validateUserUseCase.execute({
        email: user.email,
        password: "incorrect password",
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
