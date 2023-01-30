import { Injectable } from '@nestjs/common';
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

  async findOneByLogin(login: string): Promise<User | null> {
    console.log(`users.service: findOneByLogin(${login})`);
    const result = await this.userRepository.findOneBy({ login });
    console.log(result);
    return result;
  }

  async getById(id: number): Promise<any> {
    console.log(`users.service: getByid(${id})`);
    const result = await this.userRepository.findOneBy({ id });
    return result;
  }

  displayAll() {
    console.log(`users.service: displayAll(userRepository)`);
    return this.userRepository.find();
  }

  clear() {
    console.log(`users.service: clear(userRepository)`);
    return this.userRepository.clear();
  }

  async signUp(user: SignDto): Promise<User | null> {
    console.log(`users.service: signUp(${user.login})`);
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password, salt);
    const reqBody = {
      login: user.login,
      password: hash,
    };
    const newUser = await this.userRepository.save(reqBody);
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
    return foundUser;
  }
}
