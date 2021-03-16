import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {UserService} from 'src/user/user.service';
import { userDto } from 'src/user/user.dto';
import { User } from '../user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private  userService:UserService) {
    super();
  }

  async validate(data:userDto): Promise<User> {
    const user = await this.userService.validateUser(data);
    if (!user) {
      console.log("validate func");
      throw new UnauthorizedException();
    }
    return user;
  }
}