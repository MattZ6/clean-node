import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '../../helpers/http/http';
import {
  IValidation,
  IController,
  IHttpRequest,
  IHttpRespose,
  IAuthentication,
} from './SignInController.protocols';

export class SignInController implements IController {
  constructor(
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation
  ) {}

  async handle({ body }: IHttpRequest): Promise<IHttpRespose> {
    try {
      const error = this.validation.validate(body);

      if (error) {
        return badRequest(error);
      }

      const { email, password } = body;

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
