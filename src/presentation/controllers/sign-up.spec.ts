import SignUpController from './sign-up';

describe('SignUpController', () => {
  it('should return 400 if no name is provided', () => {
    const systemUnderTest = new SignUpController();

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = systemUnderTest.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: name'));
  });
});
