import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/exceptions/appException";

export class AlreadyLovedException extends AppException {
  constructor() {
    super({
      message: "Você ja curtiu este post!",
      status: HttpStatus.NOT_FOUND,
    });
  }
}
