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
  async getMusic(@Param('musicpath') music, @Res() res): Promise<any> {
    return res.sendFile(music, {root: 'uploads'})
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('music'))
  postMusic(@GetUser() user: IUser, @UploadedFiles() file): any {
      console.log(file);
  }
}
