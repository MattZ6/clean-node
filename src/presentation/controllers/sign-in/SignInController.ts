import { IAuthentication } from '../../../domain/usecases/IAuthentication';
import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, serverError, unauthorized } from '../../helpers/http';
import { IController, IHttpRequest, IHttpRespose } from '../../protocols';
import { IEmailValidator } from '../../protocols/IEmailValidator';

export class SignInController implements IController {
  constructor(
    private readonly emailValidator: IEmailValidator,
    private readonly authentication: IAuthentication
  ) {}

  async handle({ body }: IHttpRequest): Promise<IHttpRespose> {
    try {
      const requiredFields = ['email', 'password'];

      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { email, password } = body;

      const isValidEmail = this.emailValidator.isValid(email);

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'));
      }

      const accessToken = await this.authentication.auth({
        email,
        password,
      });

      if (!accessToken) {
        return unauthorized();
      }

      return {} as IHttpRespose;
    } catch (error) {
      return serverError(error);
    }
  }
}
