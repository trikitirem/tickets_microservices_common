import { CustomError } from "./custom_error";

export class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor() {
    super("Forbidden");
  }

  serializeErrors() {
    return [{ message: "Forbidden" }];
  }
}
