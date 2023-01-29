import { Exclude } from 'class-transformer';
import Dbfiles from 'src/dbfiles/dbfiles.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

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

  @JoinColumn({ name: 'avatarId' })
  @OneToOne(() => Dbfiles, {
    nullable: true,
  })
  public avatar: Dbfiles;

  @Column({ nullable: true })
  public avatarId: number;
}
