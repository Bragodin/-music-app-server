import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeMusicNameDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;


}
