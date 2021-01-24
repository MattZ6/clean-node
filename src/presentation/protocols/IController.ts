import { IHttpRequest, IHttpRespose } from '.';

export default interface IController {
  handle(request: IHttpRequest): IHttpRespose;
}
