import { CustomError } from "./custom_error";

export class UnauthorizedError extends CustomError {
  statusCode = 401;
  private static defaultMessage = "UNAUTHORIZED";

  constructor(message?: string) {
    super(message ?? UnauthorizedError.defaultMessage);
  }

  serializeErrors() {
    return [{ message: this.message ?? UnauthorizedError.defaultMessage }];
  }
}
