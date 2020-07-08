import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get(':id')
  // @UseGuards(AuthGuard())
  getUsersNameById(@Param('id') id: string): any{
    return this.userService.getUsersNameById(id);
  }
}
