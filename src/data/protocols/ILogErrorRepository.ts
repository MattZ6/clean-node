export interface ILogErrorRepository {
  log(stackTrace?: string): Promise<void>;
}
