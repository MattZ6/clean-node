import IEmailValidator from '../presentation/protocols/IEmailValidator';

export default class EmailValidatorAdapter implements IEmailValidator {
  public isValid(_: string): boolean {
    return false;
  }
}
