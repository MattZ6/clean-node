import { hash } from 'bcrypt';

import { IEncrypter } from '../../data/protocols/IEncrypter';

export class BCryptCriptographyAdapter implements IEncrypter {
  constructor(private readonly salt: number) {}

  async encrypt(value: string): Promise<string> {
    const hashedValue = await hash(value, this.salt);

    return hashedValue;
  }
}
