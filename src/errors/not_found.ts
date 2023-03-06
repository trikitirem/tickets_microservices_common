import { CustomError } from "./custom_error";

export class NotFoundError extends CustomError {
  statusCode = 404;
  private static defaultMessage = "NOT_FOUND";

  constructor(message?: string) {
    super(message ?? NotFoundError.defaultMessage);
  }

  serializeErrors() {
    return [{ message: this.message ?? NotFoundError.defaultMessage }];
  }
}
