import { CustomError } from "./custom_error";

export class BadRequestError extends CustomError {
  statusCode = 400;
  private static defaultMessage = "BAD_REQUEST";

  constructor(message?: string) {
    super(message ?? BadRequestError.defaultMessage);
  }

  serializeErrors() {
    return [{ message: this.message ?? BadRequestError.defaultMessage }];
  }
}
