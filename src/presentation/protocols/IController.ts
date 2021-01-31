import { IHttpRequest, IHttpRespose } from '.';

export interface IController {
  handle(request: IHttpRequest): Promise<IHttpRespose>;
}
