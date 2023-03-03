import * as jwt from "jsonwebtoken";

export const sign = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_KEY!);
};

export const verify = (token: string) => {
  return jwt.verify(token, process.env.JWT_KEY!) as jwt.JwtPayload;
};
