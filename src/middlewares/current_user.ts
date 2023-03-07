import { Request, Response, NextFunction } from "express";
import { JsonWebToken } from "../services";

type UserPayload = {
  id: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (req: Request, _: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return next();
    }

    const token = authorization.replace("Bearer ", "");

    const payload = JsonWebToken.verify(token) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    console.log(err);
  }

  next();
};
