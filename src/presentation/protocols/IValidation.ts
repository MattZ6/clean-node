export interface IValidation {
  validate(data: any): Error | null;
}
