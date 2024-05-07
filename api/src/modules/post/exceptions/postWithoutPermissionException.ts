import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/exceptions/appException";

interface postWithoutPermissionExceptionProps {
  actionName: string;
}

export class postWithoutPermissionException extends AppException {
  constructor({ actionName }: postWithoutPermissionExceptionProps) {
    super({
      message: `Sem permissão para ${actionName} o post`,
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
