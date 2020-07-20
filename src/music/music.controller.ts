import {
  Body,
  Controller, Delete,
  Get,
  Param, Patch,
  Post, Put,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors, ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { MusicService } from './music.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../components/decorators/get-user.decorator';
import { IUser } from '../user/interfaces/user.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateMusicDto } from './dto/create-music.dtp';
import { ChangePasswordDto } from '../auth/dto/change-password.dto';
import { ChangeMusicNameDto } from './dto/change-music.dto';
import { ApiFile } from '../components/decorators/upload-file.decorator';

@ApiTags('music')
@ApiBearerAuth()
@Controller('music')

export class MusicController {
  constructor(private readonly musicService: MusicService) {
  }

  @Get(':musicpath')
  async getMusic(@Param('musicpath') music, @Res() res): Promise<any> {
    return res.sendFile(music, {root: 'uploads'})
  }

  @Post('addmusic/:name')
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiFile('music')
  @UseInterceptors(FilesInterceptor('music'))
  // postMusic(@Body(ValidationPipe) changeMusicNameDto: ChangeMusicNameDto, @GetUser() user: IUser, @UploadedFile() file): any {
  postMusic(@Param('name') name: string, @GetUser() user: IUser, @UploadedFiles() file): any {
    const music = {
      name: name,
      fileName: file[0].filename,
      authorId: user._id,
      rating: 0,
      likes: 0
    }
    return this.musicService.postMusic(music);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  removeMusic(@Param('id') id: string): any {
    return this.musicService.removeMusic(id);
  }

  @Put(':id/changeMusicName')
  @UseGuards(AuthGuard('jwt'))
  async changeMusicName(@Param('id') id: string, @Body(ValidationPipe) changeMusicNameDto: ChangeMusicNameDto): Promise<object> {
    return this.musicService.changeMusicName(id, changeMusicNameDto);
  }
}
