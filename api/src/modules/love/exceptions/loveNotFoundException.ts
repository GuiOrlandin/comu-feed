import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/exceptions/appException";

export class LoveNotFoundException extends AppException {
  constructor() {
    super({
      message: "Love não foi encontrado!",
      status: HttpStatus.NOT_FOUND,
    });
  }
}
