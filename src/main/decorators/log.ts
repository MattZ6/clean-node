import {
  IController,
  IHttpRequest,
  IHttpRespose,
} from '../../presentation/protocols';

import { ILogErrorRepository } from '../../data/protocols/db/ILogErrorRepository';

export class LogControllerDecorator implements IController {
  constructor(
    private readonly controller: IController,
    private readonly logErrorRepository: ILogErrorRepository
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpRespose> {
    const response = await this.controller.handle(request);

    if (response.statusCode === 500) {
      const error = response.body as Error;

      await this.logErrorRepository.saveError(error.stack);
    }

    return response;
  }
}
