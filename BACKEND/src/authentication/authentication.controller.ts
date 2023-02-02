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
  UploadedFile,
  UseGuards,
  UseInterceptors,
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
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly usersService: UsersService,
    private readonly tfaService: TFAService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  upload = multer({ dest: './upload' });

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
  redirect(@Req() req: ExpressRequest, @Res() res: ExpressResponse) {
    console.log(`authentication.controller: redirect(signin) ---> SUCCESS`);
    return res.redirect('http://localhost:3000');
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async getFileMeta(
    @UploadedFile() f: Express.Multer.File,
    @Req() req: ExpressRequest,
    @Res() res: ExpressResponse,
  ) {
    //const obj = JSON.parse(JSON.stringify(req.body));
    console.log(f);
    //console.log('meta--->', f);
    res.send('SUCCESS!');
  }

  @Post('data')
  getFileBody(@Req() req: ExpressRequest) {
    const v = Object.values(req);
    const jsonObject = { ...v[0] };
    console.log('->', jsonObject['buffer']);
    //console.log(jsonObject['buffer']['head'].data);
    const raw = jsonObject['buffer']['head'].data.toString('hex') as string;
    console.log('len = ', raw.length);
    //console.log(raw);
    const a = raw; //.slice(0, 512);
    const b = a.split('\r\n')[0];
    const b2 = b.slice(0, 512);
    const b3 = raw.split('89504e470d0a1a0a');
    console.log('->', b3[1].slice(0, 512));
    //console.log('->', b2);
    //console.log('->', b3);
    //console.log(b.length + b2.length + b3.length);
    //const buf = Buffer.from(
    //  raw.slice(b.length + b2.length + b3.length, raw.length),
    //);
    //const test = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    //const test2 = new Uint8Array(test);
    //console.log(test2);
    //const array = new Uint8Array(buf);
    //console.log(array);
    //console.log(c);

    //-----------------------------221600741938944690312584630824
  }

  @Post('signup')
  async signup(@Res() res: ExpressResponse, @Body() user: SignDto) {
    const newUser = await this.authService.signUp(user);
    if (newUser) {
      console.log(
        `authentication.controller: signUp(${newUser.login}) ---> SUCCESS`,
      );
      return res.send(newUser);
    }
    console.log(`authentication.controller: signUp(${user.login}) ---> FAIL`);
    return res.status(401);
  }

  @Post('signin')
  async signIn(@Res() res: ExpressResponse, @Body() body: loginDto) {
    const foundUser = await this.usersService.findOneByLogin(body.login);
    if (foundUser) {
      //const { phoneNumber } = foundUser;
      //const code = Math.floor(1000 + Math.random() * 9000);
      // await this.tfaService.sendSms(
      //   phoneNumber,
      //   `Your verification code is: ${code}`,
      // );
      // await this.addToCache(body.login, Number(code).toString());
      //console.log(`authentication.controller: signin(${body}) ---> SUCCESS`);
      const cookie = await this.authService.login(body);
      //console.log(cookie.split(' ')[1]);
      const secret = this.configService.get('JWT_SECRET') as string;
      console.log(
        'cookie --> ',
        this.jwtService.verify(cookie.split(' ')[1], { secret: secret }),
        );
      res.setHeader('Set-Cookie', cookie);
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
