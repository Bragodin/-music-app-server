import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MusicService } from './music.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../components/decorators/get-user.decorator';
import { IUser } from '../user/interfaces/user.interface';

@ApiTags('music')
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {
  }

  @Get(':musicpath')
  @UseGuards(AuthGuard())
  async getMusic(@GetUser() user: IUser, @Param('musicpath') music, @Res() res): Promise<any> {
    return res.sendFile(music, {root: 'uploads'})
  }

  @Post()
  @UseInterceptors(FilesInterceptor('music'))
  postMusic(@UploadedFiles() file): any {
    console.log(file);
  }
}
