import { CustomError } from "./custom_error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Not found");
  }

  serializeErrors() {
    return [{ message: "Not found" }];
  }
}
