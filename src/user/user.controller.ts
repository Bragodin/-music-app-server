import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../components/decorators/get-user.decorator';
import { IUser } from './interfaces/user.interface';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getUsersNameById(@Param('id') id: string): any{
    return this.userService.getUsersNameById(id);
  }
}
