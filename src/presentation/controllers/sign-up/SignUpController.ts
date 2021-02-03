import {
  IHttpRequest,
  IHttpRespose,
  IController,
  ICreateAccount,
  IValidation,
} from './SignUpController.protocols';

import { ok, badRequest, serverError } from '../../helpers/http/http';

export class SignUpController implements IController {
  constructor(
    private readonly createAccountUseCase: ICreateAccount,
    private readonly validation: IValidation
  ) {}

  public async handle({ body }: IHttpRequest): Promise<IHttpRespose> {
    try {
      const error = this.validation.validate(body);

      if (error) {
        return badRequest(error);
      }

      const { name, email, password } = body;

      const account = await this.createAccountUseCase.execute({
        name,
        email,
        password,
      });

      return ok(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
