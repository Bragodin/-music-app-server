import { createParamDecorator } from '@nestjs/common';
import {IUser} from '../../user/interfaces/user.interface';

export const GetUser = createParamDecorator(
  (data,req): IUser => {
    if(req.args[0].user){
      console.log('user in decorator')
      console.log(req.args[0].filds)
      return req.args[0].user
    } else {
      return req.args[0]
    }
  }
);

