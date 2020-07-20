import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMusicDto {

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly authorId: string;

  @ApiProperty()
  readonly rating: number;

  @ApiProperty()
  readonly likes: number;

}
