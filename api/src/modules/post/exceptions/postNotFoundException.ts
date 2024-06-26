import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/exceptions/appException";

export class PostNotFoundException extends AppException {
  constructor() {
    super({
      message: "Post não encontrado",
      status: HttpStatus.NOT_FOUND,
    });
  }
}
