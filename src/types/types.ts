import { Request, Response, NextFunction } from "express";

export type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export type ExpressErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export type UserType = {
  id: number;
  name: string;
  email: string;
  refreshToken: string;
};

export type TokenType = {
  id: string;
  iat: number;
  exp: number;
};
