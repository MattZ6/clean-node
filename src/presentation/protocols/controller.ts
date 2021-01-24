import { IHttpRequest, IHttpRespose } from './http';

export default interface IController {
  handle(request: IHttpRequest): IHttpRespose;
}
