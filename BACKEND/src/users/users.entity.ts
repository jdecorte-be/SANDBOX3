import { Exclude } from 'class-transformer';
import { readFileSync } from 'graceful-fs';
import * as path from 'path';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
  Matches,
} from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  public login: string;

  @Column()
  @Exclude()
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  password: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ default: false, nullable: true })
  @IsBoolean()
  public isActive: boolean;

  @Column({ default: 'default.jpg' })
  @IsString()
  filename: string;

  @Column({
    type: 'bytea',
    default: readFileSync(path.resolve('src/users/default.jpg')),
  })
  avatar: Uint8Array;
}
