import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public login: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  phoneNumber: string;

  @Column({ default: false, nullable: true })
  public isActive: boolean;

  @Column({ nullable: true })
  filename: string;

  @Column({
    nullable: true,
    type: 'bytea',
  })
  avatar: Uint8Array;
}
