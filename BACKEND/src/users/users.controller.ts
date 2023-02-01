import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { RequestWithUser } from 'src/authentication/authentication.interfaces';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
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

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  uploadFile(@UploadedFiles() file: Express.Multer.File) {
    console.log('--->', file);
    return file;
  }

  // @Post('avatar')
  // @UseInterceptors(FileInterceptor('file'))
  // async addAvatar(@Req() request: Request, @UploadedFile() file: Express.Multer.File) {
  //   console.log(request);
  //   return this.usersService.uploadFile(file.buffer, file.originalname);
  // }
}
