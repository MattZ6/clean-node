import {
  IController,
  IHttpRequest,
  IHttpRespose,
} from '../../presentation/protocols';

export class LogControllerDecorator implements IController {
  constructor(private readonly controller: IController) {}

  async handle(request: IHttpRequest): Promise<IHttpRespose> {
    const response = await this.controller.handle(request);

    if (response.statusCode === 500) {
      // TODO: Log
    }

    return response;
  }
}
