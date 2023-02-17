import { Module } from '@nestjs/common';
import { DbfilesService } from './dbfiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Dbfiles from './dbfiles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dbfiles])],
  providers: [DbfilesService],
})
export class DbfilesModule {}
