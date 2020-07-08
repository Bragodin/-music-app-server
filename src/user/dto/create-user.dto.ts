import { IsEmail, IsString, IsNotEmpty, Matches, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly role: Array<string>;

  @ApiProperty()
  readonly status: string;

  @ApiProperty()
  readonly avatar?: string;

}



