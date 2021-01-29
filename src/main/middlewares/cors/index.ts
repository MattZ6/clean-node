import { NextFunction, Request, Response } from 'express';

export default function cors(
  _: Request,
  response: Response,
  next: NextFunction
): void {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', '*');
  response.set('Access-Control-Allow-Headers', '*');

  next();
}
