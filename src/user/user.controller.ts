import { Controller, Get, Param, Patch, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../components/decorators/get-user.decorator';
import { IUser } from './interfaces/user.interface';
import { ApiFile } from '../components/decorators/upload-file.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getUsersNameById(@Param('id') id: string): any{
    return this.userService.getUsersNameById(id);
  }

  @Get(':id/myMusic')
  @UseGuards(AuthGuard('jwt'))
  getUserMusic(@Param('id') id: string): any{
    return this.userService.getMyMusic(id);
  }

  @Put(':id/addMusic/:musicId')
  @UseGuards(AuthGuard('jwt'))
  addMusicToUser(@Param( 'musicId')musicId: string, @Param( 'id') id: string): any {
    return this.userService.addMusicToUser(id, musicId);
  }

  // @Post('/addAvatar')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiConsumes('multipart/form-data')
  // @ApiFile('music')
  // @UseInterceptors(FilesInterceptor('music'))
  // postAvatar(@GetUser() user: IUser, @UploadedFiles() file): any {
  //   const avatar = {
  //     name: file[0].filename,
  //     userId: user._id,
  //   }
  //   return this.userService.addAvatar(avatar);
  // }
  

  @Patch(':id/removeMusic/:musicId')
  @UseGuards(AuthGuard('jwt'))
  removeMusicFromUser(@Param( 'musicId')musicId: string, @Param( 'id') id: string): any {
    return this.userService.removeMusicFromUser(id, musicId);
  }
}
