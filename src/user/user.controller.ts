import { Controller, ValidationPipe, Body, Post, Param, Patch, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post('/signup')
    create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User>{
        return this.userService.create(createUserDto);
    }

    @Post('/login')
    login(@Body(ValidationPipe) updateUserDto: UpdateUserDto): Promise<User>{
        return this.userService.login(updateUserDto);
    }

    @Patch(':id') // PUT requests to update menu by ID
    update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }

    @Get('find-users')
    findAll(): Promise<User[]>{
        return this.userService.findAll();
    }
}

