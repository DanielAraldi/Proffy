import { NextFunction, Request, Response } from "express";

import { ApiError } from "./ApiError";

export const AsyncErrors = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ApiError) {
    return res
      .status(error.statusCode)
      .json({ message: error.message, statusCode: error.statusCode });
  }

  return res.status(500).json({
    message: error.message,
    statusCode: res.statusCode,
  });
};
