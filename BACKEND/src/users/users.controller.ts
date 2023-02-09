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
  StreamableFile,
} from '@nestjs/common';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { UserIdDto } from './users.dto';
import { Readable } from 'stream';
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
      const user = await this.usersService.uploadFile(
        req.body?.user,
        req.file?.buffer,
        req.file?.originalname,
      );
      if (user) {
        return res.status(200).send(user);
      }
      return res
        .status(400)
        .send('Invalid request. Please choose a different file');
    }
  }

  @Post('profile')
  async getProfile(@Body() body: UserIdDto) {
    console.log('---->', body.id, typeof body.id);
    const user = await this.usersService.getById(body.id);
    if (user) {
      const avatar = user.avatar;
      const base64EncodedAvatar = Buffer.from(avatar).toString('base64');
      return {
        avatar: base64EncodedAvatar,
        login: user.login,
        status: user.status,
      }
    }
  }
}
