import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt';
const saltRounds = 10;

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid', {comment: 'unique identifier'})
    id: string;

    @Column({nullable: false})
    user_name: string

    @Column({nullable: false, unique:true})
    email: string

    @Column({nullable: false})
    password: string

    @CreateDateColumn({nullable: false})
    createdAt: Date

    @UpdateDateColumn({nullable: false})
    updatedAt: Date

    @BeforeInsert()
    async setPassword(password: string) {
        const Salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(password || this.password, Salt)
    }
}