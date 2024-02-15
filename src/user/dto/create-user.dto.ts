import { IsNotEmpty, IsString, IsInt, IsPositive } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Field user_name must be added' })
    @IsString()
    user_name: string

    @IsNotEmpty({ message: 'Field email must be added' })
    @IsString()
    email: string

    @IsNotEmpty({ message: 'Field password must be added' })
    @IsString()
    password: string

}