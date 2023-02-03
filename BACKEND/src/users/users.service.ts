import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { SignDto } from 'src/users/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async displayAll() {
    console.log(`users.service: displayAll(userRepository)`);
    return await this.userRepository.find();
  }

  async clear() {
    console.log(`users.service: clear(userRepository)`);
    return await this.userRepository.clear();
  }

  async uploadFile(
    id: number,
    buffer: Buffer,
    filename: string,
    type: string,
    size: number,
  ): Promise<User | null> {
    console.log(`users.service: uploadFile(${id} -> ${filename})`);
    const user = await this.getById(id);
    if (user) {
      user.filename = filename;
      user.avatar = buffer;
      const res = await this.userRepository.save(user);
      return res;
    } else {
      return null;
    }
  }

  async findOneByLogin(login: string): Promise<User | null> {
    console.log(`users.service: findOneByLogin(${login})`);
    const result = await this.userRepository.findOneBy({ login });
    if (result) return result;
    return null;
  }

  async getById(id: number): Promise<User | null> {
    console.log(`users.service: getByid(${id})`);
    const result = await this.userRepository.findOneBy({ id });
    if (result) return result;
    return null;
  }

  async signUp(user: SignDto): Promise<User | null> {
    console.log(`users.service: signUp(${user.login})`);
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password, salt);
    const reqBody = {
      login: user.login,
      password: hash,
      phoneNumber: user.phoneNumber,
    };
    const newUser = await this.userRepository.save(reqBody).catch(() => {
      return null;
    });
    if (newUser) {
      return newUser;
    }
    return null;
  }

  async signIn(user: SignDto): Promise<User | null> {
    console.log(`users.service: signIn(${user.login})`);
    const { login } = user;
    const foundUser = await this.userRepository.findOneBy({ login });
    if (foundUser) {
      const { password } = foundUser;
      const result = bcrypt.compareSync(user.password, password);
      if (result) {
        foundUser.isActive = true;
        await this.userRepository.save(foundUser);
        return foundUser;
      }
    }
    return null;
  }
}
