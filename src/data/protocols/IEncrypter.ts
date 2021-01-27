export default interface IEncrypter {
  encrypt(value: string): Promise<string>;
}
