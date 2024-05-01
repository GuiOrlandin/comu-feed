import { UserRepositoryInMemory } from "src/modules/user/repositories/userRepositoryInMemory";
import { ValidateUserUseCase } from "./validateUserUseCase";
import { hash } from "bcrypt";
import { makeUser } from "src/modules/user/factories/userFactory";
import { UnauthorizedException } from "@nestjs/common";
import { SignInUseCase } from "./signInUseCase";
import { JwtService } from "@nestjs/jwt";
import { UserPayload } from "../models/userPayload";

let signInUseCase: SignInUseCase;
let jwtService: JwtService;

describe("Sign In", () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: "secret" });
    signInUseCase = new SignInUseCase(jwtService);
  });

  it("Should be able to created valid access token", async () => {
    const userPasswordWithoutEncryption = "123456";

    const user = makeUser({
      password_hash: await hash(userPasswordWithoutEncryption, 10),
    });

    const token = await signInUseCase.execute({
      user,
    });

    const payload = jwtService.decode(token) as UserPayload;

    expect(payload.sub).toEqual(user.id);
  });
});
