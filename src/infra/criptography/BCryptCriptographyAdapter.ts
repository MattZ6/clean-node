import bcrypt from 'bcrypt';

import IEncrypter from '../../data/protocols/IEncrypter';

export default class BCryptCriptographyAdapter implements IEncrypter {
  constructor(private readonly salt: number) {}

  async encrypt(value: string): Promise<string> {
    await bcrypt.hash(value, this.salt);

    return '';
  }
}
