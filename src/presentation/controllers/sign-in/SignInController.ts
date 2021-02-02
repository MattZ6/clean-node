import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http';
import { IController, IHttpRequest, IHttpRespose } from '../../protocols';
import { ISignInDataDTO } from './SignInController.types';

export class SignInController implements IController {
  async handle(request: IHttpRequest<ISignInDataDTO>): Promise<IHttpRespose> {
    const requiredFields = ['email', 'password'];

    for (const field of requiredFields) {
      if (!(request.body as any)[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    return {} as IHttpRespose;
  }
}
