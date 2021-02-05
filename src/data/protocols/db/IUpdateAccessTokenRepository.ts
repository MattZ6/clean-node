export interface IUpdateAccessTokenDataDTO {
  accountId: string;
  accessToken: string;
}

export interface IUpdateAccessTokenRepository {
  update(data: IUpdateAccessTokenDataDTO): Promise<void>;
}
