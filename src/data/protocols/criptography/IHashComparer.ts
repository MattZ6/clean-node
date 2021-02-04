export interface IHashComparer {
  compare(value: string, hashedValue: string): Promise<boolean>;
}
