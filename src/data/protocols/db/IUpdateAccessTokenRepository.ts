export interface IUpdateAccessTokenDataDTO {
  accountId: string;
  accessToken: string;
}

export interface IUpdateAccessTokenRepository {
  updateAccessToken(data: IUpdateAccessTokenDataDTO): Promise<void>;
}
