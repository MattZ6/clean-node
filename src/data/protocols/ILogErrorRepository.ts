export interface ILogErrorRepository {
  saveError(stackTrace?: string): Promise<void>;
}
