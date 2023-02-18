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
    const token = req.cookies.token;

    if (!token) {
      return next();
    }

    const payload = JsonWebToken.verify(token) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
