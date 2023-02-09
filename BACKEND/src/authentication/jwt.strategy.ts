import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    const secret = configService.get('JWT_SECRET') as string;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(secret, 'base64'),
    });
  }

  async validate(payload: any) {
    const founduser = this.userService.getByLogin(payload.login);
    if (founduser) {
      console.log(`jwt.strategy: validate(user = ${founduser})`);
      return founduser;
    }
    return null;
  }
}
