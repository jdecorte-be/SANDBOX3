import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { JwtAuthenticationGuard, LocalAuthGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { codeDto, loginDto, SignDto } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';
import { TFAService } from './twilio.service';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly usersService: UsersService,
    private readonly tfaService: TFAService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async addToCache(key: string, item: string): Promise<any> {
    await this.cacheManager.set(key, item, 300);
  }

  async getFromCache(key: string) {
    const value = await this.cacheManager.get(key);
    const str: string = value as string;
    return str;
  }

  //@UseGuards(JwtAuthenticationGuard)
  //@Get('who')
  //who(@Request() req: any) {
  //  return req.user;
  //}

  @UseGuards(LocalAuthGuard)
  @Get()
  auth() {
    console.log(`authentication.controller: auth(42auth)`);
  }

  @Get('redirect')
  redirect(@Req() req: ExpressRequest, @Res() res: ExpressResponse) {
    console.log(`authentication.controller: redirect(signin) ---> SUCCESS`);
    return res.redirect('http://localhost:3000');
  }

  
  @Post('signup')
  async signup(@Res() res: ExpressResponse, @Body() register: SignDto) {
    const user = await this.usersService.signUp(register).catch((err) => {
      console.log('--->', err);
      return res.status(400).send(err);
    });
    if (user) return res.status(201).send({ user });
  }

  @Post('signin')
  async signIn(@Res() res: ExpressResponse, @Body() body: loginDto) {
    const user = await this.usersService.signIn(body);
    if (user) {
      //const { phoneNumber } = user;
      //const code = Math.floor(1000 + Math.random() * 9000);
      // await this.tfaService.sendSms(
      //   phoneNumber,
      //   `Your verification code is: ${code}`,
      // );
      // await this.addToCache(body.login, Number(code).toString());
      const cookie = await this.authService.login(body);
      return res.status(200).send({ user, cookie });
    }
    return res.status(401).send('Invalid credentials');
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('code')
  async tfaCode(@Res() res: ExpressResponse, @Body() body: codeDto) {
    const userCode = await this.getFromCache(body.login);
    if (userCode.localeCompare(body.code) !== 0) {
      return res.status(401).send('Invalid code provided');
    }
    return res.status(200).send(userCode);
  }
}
