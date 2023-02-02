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

  /*
  For the jwt-strategy, Passport first verifies the JWT's signature and decodes the JSON. 
  It then invokes our validate() method passing the decoded JSON as its single parameter. 
  Based on the way JWT signing works, we're guaranteed that we're receiving a valid token 
  that we have previously signed and issued to a valid user.
  As a result of all this, our response to the validate() callback is trivial: we simply 
  return an object containing the userId and username properties. Recall again that 
  Passport will build a user object based on the return value of our validate() method, 
  and attach it as a property on the Request object.
  
   /---------------------------------------------\
  | ===== LE FORMAT DU TOKEN DANS LE HEADER ===== |
   \---------------------------------------------/
  "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFybmF1ZCIsImlhdCI6MTY3NDg2OTYyMCwiZXhwIjoxNzYxMjY5NjIwfQ.oYGCUwjKsqYkvUNEAr4u4BJZ4vCG_gxhhTljqm7oHzo"
  */
  async validate(payload: any) {
    //const k = Object.keys(payload); // [login, iat=issued at time, exp=expiration time]
    //const v = Object.values(payload);
    //console.log('KEYS: ', k, 'VALUES: ', v);
    const founduser = this.userService.findOneByLogin(payload.login);
    if (founduser) {
      console.log(`jwt.strategy: validate(user = ${founduser})`);
      return founduser;
    }
    return null;
  }
}
