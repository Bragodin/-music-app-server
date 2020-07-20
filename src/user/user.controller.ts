import { Controller, Get, Param, Patch, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../components/decorators/get-user.decorator';
import { IUser } from './interfaces/user.interface';

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

  @Patch(':id/removeMusic/:musicId')
  @UseGuards(AuthGuard('jwt'))
  removeMusicFromUser(@Param( 'musicId')musicId: string, @Param( 'id') id: string): any {
    return this.userService.removeMusicFromUser(id, musicId);
  }
}
