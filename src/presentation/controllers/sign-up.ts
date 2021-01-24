/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default class SignUpController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public handle(_: any): any {
    return {
      statusCode: 400,
      body: new Error('Missing param: name'),
    };
  }
}
