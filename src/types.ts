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
