import {
  Controller,
  Get,
  UseInterceptors,
  Post,
  Req,
  Res,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { UpdateProfileDto } from './users.dto';
const storage = multer.memoryStorage();

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('display')
  displayAll() {
    console.log(`users.controller: displayAll()`);
    return this.usersService.displayAll();
  }

  @Get('clear')
  clear() {
    console.log(`users.controller: clear()`);
    return this.usersService.clear();
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async getFile(@Req() req: ExpressRequest, @Res() res: ExpressResponse) {
    console.log(`users.controller: getFile()`);
    if (req.file && req.body.user) {
      if (!['image/png', 'image/jpeg'].includes(req.file?.mimetype)) {
        return res
          .status(415)
          .send(
            'The file type is not supported by the server. (png/jpeg/jpg only).',
          );
      }
      if (req.file?.size > 100000) {
        return res
          .status(413)
          .send(
            'The file size exceeds the maximum allowed size specified by the server. (100ko).',
          );
      }
      await this.usersService.uploadFile(
        req.body?.user,
        req.file?.buffer,
        req.file?.originalname,
      );
      const user = await this.usersService.getById(
        Number.parseInt(req.body.user),
      );
      if (user) {
        const base64EncodedAvatar = Buffer.from(user.avatar).toString('base64');
        return res.status(200).send({
          avatar: base64EncodedAvatar,
          login: user.login,
          status: user.status,
        });
      }
      return res
        .status(400)
        .send('Invalid request. Please choose a different file');
    }
  }

  @Post('profile')
  async getProfile(
    @Body() body: UpdateProfileDto,
    @Res() res: ExpressResponse,
  ) {
    const user = await this.usersService.getById(body.id);
    if (user) {
      if (body.login) {
        await this.usersService.updateLogin(user, body.login);
      }
      const base64EncodedAvatar = Buffer.from(user.avatar).toString('base64');
      return res.status(200).send({
        avatar: base64EncodedAvatar,
        login: user.login,
        status: user.status,
      });
    }
  }

  @Get('profile/:id')
  async initProfile(@Param('id') id: string, @Res() res: ExpressResponse) {
    const user = await this.usersService.getById(Number.parseInt(id));
    if (user) {
      const base64EncodedAvatar = Buffer.from(user.avatar).toString('base64');
      return res.status(200).send({
        avatar: base64EncodedAvatar,
        login: user.login,
        status: user.status,
      });
    }
  }

  @Get('leaderboard')
  async getLeaders(@Res() res: ExpressResponse) {
    const data = await this.usersService.getLeaderboard();
    if (data) {
      return res.status(200).send(data);
    }
    return res.status(400).send('Failed to request the leaderboard.');
  }
}
