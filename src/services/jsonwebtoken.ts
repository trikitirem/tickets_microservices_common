import * as jwt from "jsonwebtoken";

export class JsonWebToken {
  static sign(payload: object) {
    return jwt.sign(payload, process.env.JWT_KEY!);
  }

  static verify(token: string) {
    return jwt.verify(token, process.env.JWT_KEY!) as jwt.JwtPayload;
  }
}
