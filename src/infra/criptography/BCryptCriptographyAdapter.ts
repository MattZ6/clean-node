import { hash, compare } from 'bcrypt';

import { IHasher } from '../../data/protocols/criptography/IHasher';
import { IHashComparer } from '../../data/protocols/criptography/IHashComparer';

export class BCryptCriptographyAdapter implements IHasher, IHashComparer {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    const hashedValue = await hash(value, this.salt);

    return hashedValue;
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return compare(value, hashedValue);
  }
}
