import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/exceptions/appException";

export class CommentNotFoundException extends AppException {
  constructor() {
    super({
      message: "o comentário não foi encontrado!",
      status: HttpStatus.NOT_FOUND,
    });
  }
}
