import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chats.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [ChatsService],
})
export class ChatsModule {}