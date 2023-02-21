import { readFileSync } from 'graceful-fs';
import * as path from 'path';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { MatchHistoryDto } from './users.dto';
const defaultImg = readFileSync(path.resolve('src/users/default.jpg'));

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public login: string;

  @Column()
  private _password: string;

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ default: 'offline' })
  public status: string;

  @Column('text', { array: true, nullable: true })
  blackList: string[];

  @Column('text', { array: true, nullable: true })
  friendList: string[];

  @Column('jsonb', { nullable: true })
  matchHistory: MatchHistoryDto[];

  @Column({ default: 0 })
  nVictories: number;

  @Column({ default: 'default.jpg' })
  filename: string;

  @Column({
    type: 'bytea',
  })
  avatar: Uint8Array;
}
