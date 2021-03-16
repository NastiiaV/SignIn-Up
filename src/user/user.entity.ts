import { text } from 'express';
import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {

    @Column()
    username: string;

    @Column({
        //type:'text',
        unique: true
    })
    email: string;

    @PrimaryColumn()
    password: string;

    @BeforeInsert()
    async hashPswd() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(pswd: string) {
        return await bcrypt.compare(pswd, this.password);
    }
}