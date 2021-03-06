import { sign } from 'jsonwebtoken';

import { IEncrypter } from '../../../data/protocols/criptography/IEncrypter';

export class JwtAdapter implements IEncrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    const encryptedValue = sign({ id: value }, this.secret);

    return encryptedValue;
  }
}
