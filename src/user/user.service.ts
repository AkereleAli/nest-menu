import { ConflictException, UnauthorizedException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const checkIfuserExists = await this.userRepository.findOne({where:{email: createUserDto.email}})
        if(checkIfuserExists ) {
            throw new ConflictException('user already exists')
        }
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    async login(updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({where:{email: updateUserDto.email}})
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isValidPassword = await bcrypt.compare(updateUserDto.password, user.password);

        if (!isValidPassword) {
          throw new UnauthorizedException('Invalid credentials');
        }
        delete user.password;
        delete user.id;
        delete user.createdAt
        delete user.updatedAt
        return user;
    }

    async update(id: string, updateUserDto:UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({where: {id}});
        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }
}
