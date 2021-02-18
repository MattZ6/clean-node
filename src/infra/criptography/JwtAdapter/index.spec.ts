import jsonwebtoken from 'jsonwebtoken';

import { JwtAdapter } from '.';

let sut: JwtAdapter;

const SECRET_KEY = 'secret';

jest.mock('jsonwebtoken', () => ({
  sign: () => 'any_token',
}));

describe('JwtAdapter', () => {
  beforeEach(() => {
    sut = new JwtAdapter(SECRET_KEY);
  });

  it('should call sign with correct values', async () => {
    const signSpy = jest.spyOn(jsonwebtoken, 'sign');

    await sut.encrypt('any_id');

    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, SECRET_KEY);
  });

  it('should return a token on sign success', async () => {
    const token = await sut.encrypt('any_id');

    expect(token).toBe('any_token');
  });

  it('should throw if sign throws', async () => {
    jest.spyOn(jsonwebtoken, 'sign').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.encrypt('any_id');

    await expect(promise).rejects.toThrow();
  });
});
