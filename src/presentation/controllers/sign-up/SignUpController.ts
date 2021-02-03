import {
  IHttpRequest,
  IHttpRespose,
  IController,
  IEmailValidator,
  ICreateAccount,
  IValidation,
} from './SignUpController.protocols';

import { MissingParamError, InvalidParamError } from '../../errors';

import { ok, badRequest, serverError } from '../../helpers/http';

export class SignUpController implements IController {
  constructor(
    private readonly emailValidator: IEmailValidator,
    private readonly createAccountUseCase: ICreateAccount,
    private readonly validation: IValidation
  ) {}

  public async handle({ body }: IHttpRequest): Promise<IHttpRespose> {
    try {
      const error = this.validation.validate(body);

      if (error) {
        return badRequest(error);
      }

      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { name, email, password, passwordConfirmation } = body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValidEmail = this.emailValidator.isValid(email);

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'));
      }

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
