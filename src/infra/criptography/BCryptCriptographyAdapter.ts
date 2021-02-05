import { hash } from 'bcrypt';

import { IHasher } from '../../data/protocols/criptography/IHasher';

export class BCryptCriptographyAdapter implements IHasher {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    const hashedValue = await hash(value, this.salt);

    return hashedValue;
  }
}
