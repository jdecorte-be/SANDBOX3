/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UsersService) {
    super();
  }

  serializeUser(user: any, done: Function) {
    console.log(`serialize(${user})`);
    done(null, user);
  }

  deserializeUser(payload: any, done: Function) {
    console.log(`deserialize(${payload})`);
    const found = this.userService.findOneByLogin(payload.login);
    if (found === null) {
      done(null, null);
    }
    done(null, payload);
  }
}
