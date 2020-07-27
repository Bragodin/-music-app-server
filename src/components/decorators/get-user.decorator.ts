import { createParamDecorator } from '@nestjs/common';
import {IUser} from '../../user/interfaces/user.interface';

export const GetUser = createParamDecorator(
  (data,req): IUser => {
    if(req.args[0].user){
      return req.args[0].user
    } else {
      return req.args[0]
    }
  }
);

