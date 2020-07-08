
export interface IReadableUser {
  readonly email: string;
  status: string;
  readonly avatar: string;
  readonly roles: Array<string>;
  accessToken?: string;
}
