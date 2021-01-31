import { Request, Response } from 'express';

import { IController } from '../../presentation/protocols';

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response): Promise<Response> => {
    const response = await controller.handle({
      body: req.body,
    });

    return res.status(response.statusCode).json(response.body);
  };
};
