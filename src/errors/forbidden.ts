import { CustomError } from "./custom_error";

export class ForbiddenError extends CustomError {
  statusCode = 403;
  private static defaultMessage = "FORBIDDEN";

  constructor(message?: string) {
    super(message ?? ForbiddenError.defaultMessage);
  }

  serializeErrors() {
    return [{ message: this.message ?? ForbiddenError.defaultMessage }];
  }
}
