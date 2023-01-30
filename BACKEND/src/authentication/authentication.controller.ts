import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
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
import { RequestWithUser } from './authentication.interfaces';
import { TFAService } from './twilio.service';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly userService: UsersService,
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

  @UseGuards(JwtAuthenticationGuard)
  @Get('who')
  who(@Request() req: any) {
    return req.user;
  }



  @UseGuards(LocalAuthGuard)
  @Get()
  auth() {
    console.log(`authentication.controller: auth(42auth)`);
  }

  @Get('redirect')
  redirect(@Req() req: Request, @Res() res: ExpressResponse) {
    console.log(`authentication.controller: redirect(signin) ---> SUCCESS`);
    return res.redirect('http://localhost:3000');
  }

  @Post('signup')
  async signup(@Res() res: ExpressResponse, @Body() user: SignDto) {
    const newUser = await this.authService.signUp(user);
    if (newUser) {
      console.log(
        `authentication.controller: signUp(${newUser.login}) ---> SUCCESS`,
      );
      return res.redirect('http://localhost:3000');
    }
    console.log(
      `authentication.controller: signUp(${newUser.login}) ---> FAIL`,
    );
    return res.send(newUser);
  }

  @Post('signin')
  async signIn(@Res() res: ExpressResponse, @Body() body: loginDto) {
    const foundUser = await this.userService.findOneByLogin(body.login);
    if (foundUser) {
      const { phoneNumber } = foundUser;
      const code = Math.floor(1000 + Math.random() * 9000);
      // await this.tfaService.sendSms(
      //   phoneNumber,
      //   `Your verification code is: ${code}`,
      // );
      // await this.addToCache(body.login, Number(code).toString());
      //console.log(`authentication.controller: signin(${body}) ---> SUCCESS`);
      const cookie = await this.authService.login(body);
      res.setHeader('Set-Cookie', cookie);
      console.log('cookie --> ',cookie);
      return res.send(cookie);
    }
    console.log(`authentication.controller: signin(${body}) ---> FAIL`);
    return res.status(401);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('code')
  async tfaCode(
    @Request() req: ExpressRequest,
    @Res() res: ExpressResponse,
    @Body() body: codeDto,
  ) {
    const value = await this.getFromCache(body.login);
    if (value.localeCompare(body.code) !== 0) {
      return res.status(401);
    }
    return req.user;
  }


  @UseGuards(JwtAuthenticationGuard)
  @Get('signout')
  logout(@Req() req: RequestWithUser, @Res() res: ExpressResponse) {
    const { user } = req;
    res.setHeader('Set-Cookie', '');
    console.log(`authentication.controller: signout(${user})`);
    return res.redirect('http://localhost:3000/signin');
  }
}
