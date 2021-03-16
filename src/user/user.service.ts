import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { userDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService) { }

  //async validateUser(username: string, pass: string): Promise<any> {
  // const user = await this.userRepository.findOne(username);
  // if (user && user.password === pass) {
  //   const { password, ...result } = user;
  //   return result;
  // }
  // return null;

  //}

  async validateUser(data: userDto): Promise<User> {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && user.comparePassword(password)) {
      console.log("Founded user:",user);
      return user;
    }

    return null;
  }


  async register(data: userDto) {

    const { email } = data;

    const payload = { email: data.email, sub: data.password };

    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    user = this.userRepository.create(data);

    console.log("Created user:", user);
    this.userRepository.save(user);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signin(data: userDto) {
    //const { email, password } = data;
    const payload = { email: data.email, sub: data.password };

    // let user = await this.userRepository.findOne({ where: { email } });
    // if (!user || !(user.comparePassword(password))) {
    //   throw new HttpException('Invalid email/password', HttpStatus.BAD_REQUEST);

    // }

    //return user;
    return {
      access_token: this.jwtService.sign(payload),
    };

  }
}
