import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthenticationGuard, LocalAuthGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { SignDto } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';
import { RequestWithUser } from './authentication.interfaces';
import { JwtService } from '@nestjs/jwt';
import { Request as FuckYou } from 'express';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private authService: AuthenticationService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Get()
  auth() {
    console.log(`authentication.controller: auth(42auth)`);
  }

  @Get('redirect')
  redirect(@Req() req: Request, @Res() res: Response) {
    console.log(`authentication.controller: redirect(signin) ---> SUCCESS`);
    return res.redirect('http://localhost:3001/signin');
  }

  @Post('signup')
  async signup(@Res() res: Response, @Body() user: SignDto) {
    const newUser = await this.authService.signUp(user);
    if (newUser) {
      console.log(
        `authentication.controller: signUp(${newUser.login}) ---> SUCCESS`,
      );
      return res.redirect('http://localhost:3001/signin');
    }
    console.log(
      `authentication.controller: signUp(${newUser.login}) ---> FAIL`,
    );
    return res.send(newUser);
  }

  @Post('signin')
  async signIn(@Res() res: Response, @Body() body: SignDto) {
    const foundUser = await this.userService.findOneByLogin(body.login);
    if (foundUser) {
      const log = await this.authService.login(body);
      const cookie = this.authService.getCookieWithJwtToken(foundUser.id);
      console.log(
        `authentication.controller: signin(${foundUser.login}) access_token(${log.access_token}) ---> SUCCESS`,
      );
      res.setHeader('Set-Cookie', cookie);
      //res.redirect('http://localhost:3000/app');
      return res.send(log);
    }
    console.log(`authentication.controller: signin(${body}) ---> FAIL`);
    return res.redirect('http://localhost:3001/signin');
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('login')
  async login(@Request() req: FuckYou) {
    return req.user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('status')
  status(@Request() req: any) {
    return req.user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('signout')
  logout(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    const cookie = this.authService.getCookieForLogOut(user.id);
    res.setHeader('Set-Cookie', cookie);
    console.log(`authentication.controller: signout(${user}) JWT = ${cookie}`);
    return res.redirect('http://localhost:3001/signin');
  }
}
