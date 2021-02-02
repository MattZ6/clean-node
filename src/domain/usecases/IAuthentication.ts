export interface IAuthenticateRequestDTO {
  email: string;
  password: string;
}

export interface IAuthentication {
  auth(data: IAuthenticateRequestDTO): Promise<string>;
}
