import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http';
import {
  IEmailValidator,
  IController,
  IHttpRequest,
  IHttpRespose,
  IAuthentication,
} from './SignInController.protocols';

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

      return ok({
        accessToken,
      });
    } catch (error) {
      return serverError(error);
    }
  }
}
