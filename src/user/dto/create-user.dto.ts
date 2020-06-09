export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly role: Array<string>;
  readonly avatar: string;
  readonly status: string;
}
