import { IsNotEmpty, IsEmail } from 'class-validator';

export class userDto {

    @IsNotEmpty()
    username: string;
    
    @IsEmail()
    email: string; 

    @IsNotEmpty()
    password: string;

}