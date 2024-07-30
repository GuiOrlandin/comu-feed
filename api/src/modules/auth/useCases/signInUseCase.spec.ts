import { hash } from "bcrypt";
import { makeUser } from "src/modules/user/factories/userFactory";
import { SignInUseCase } from "./signInUseCase";
import { JwtService } from "@nestjs/jwt";
import { UserPayload } from "../models/userPayload";
import { UserRepositoryInMemory } from "src/modules/user/repositories/userRepositoryInMemory";

let signInUseCase: SignInUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let jwtService: JwtService;

describe("Sign In", () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: "secret" });
    signInUseCase = new SignInUseCase(jwtService, userRepositoryInMemory);
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
