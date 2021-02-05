import { hash, compare } from 'bcrypt';

import { IHasher } from '../../../data/protocols/criptography/IHasher';
import { IHashComparer } from '../../../data/protocols/criptography/IHashComparer';

export class BCryptHashAdapter implements IHasher, IHashComparer {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    return hash(value, this.salt);
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return compare(value, hashedValue);
  }
}
