import jsonwebtoken from 'jsonwebtoken';

import { JwtAdapter } from '.';

let sut: JwtAdapter;

const SECRET_KEY = 'secret';

describe('JwtAdapter', () => {
  beforeEach(() => {
    sut = new JwtAdapter(SECRET_KEY);
  });

  it('should call sign with correct values', async () => {
    const signSpy = jest.spyOn(jsonwebtoken, 'sign');

    await sut.encrypt('any_id');

    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, SECRET_KEY);
  });
});
