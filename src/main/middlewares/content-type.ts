import { NextFunction, Request, Response } from 'express';

export default function contentType(
  _: Request,
  response: Response,
  next: NextFunction
): void {
  response.type('json');

  next();
}
