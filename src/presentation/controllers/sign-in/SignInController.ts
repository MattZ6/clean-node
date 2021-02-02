import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http';
import { IController, IHttpRequest, IHttpRespose } from '../../protocols';
import { IEmailValidator } from '../../protocols/IEmailValidator';

export class SignInController implements IController {
  constructor(private readonly emailValidator: IEmailValidator) {}

  async handle(request: IHttpRequest): Promise<IHttpRespose> {
    const requiredFields = ['email', 'password'];

    for (const field of requiredFields) {
      if (!(request.body as any)[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    const { email } = request.body;

    const isValidEmail = this.emailValidator.isValid(email);

    if (!isValidEmail) {
      return badRequest(new InvalidParamError('email'));
    }

    return {} as IHttpRespose;
  }
}
