import { Controller, Get, Post, Request } from '@nestjs/common';
//import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { JwtAuthGuard } from './user/guards/jwt-auth.guard';
import { LocalAuthGuard } from './user/guards/local-auth.guard';
import { UseGuards } from '@nestjs/common';
import { userDto } from './user/user.dto';
import { Body } from '@nestjs/common';


@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @UseGuards(LocalAuthGuard)
  @Post('user/signin')
  async signin(@Body() data:userDto) {
    return this.userService.signin(data);
  }

  @Post('user/signup')
  async signup(@Body() data:userDto) {
    return this.userService.register(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
