import { CustomError } from "./custom_error";

export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("User unauthorized");
  }

  serializeErrors() {
    return [{ message: "User unauthorized" }];
  }
}
