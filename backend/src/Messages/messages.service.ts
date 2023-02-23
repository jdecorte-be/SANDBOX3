import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IsUUID, validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { AddMessageInput } from './dto/addmessage.input';
import { Messages } from './entities/messages.entity';
import { Chat } from 'src/chats/entities/chat.entity';

@Injectable()
export class MessagesService {


    async addMessage(addMessageInput : AddMessageInput) {
        const chat = await Chat.findOneOrFail({
              where: {
                uuid: addMessageInput.chatUUID,
                isAlive: true,
              },
            }).catch(() => {
              throw new HttpException({ message: 'Input data validation failed' }, HttpStatus.BAD_REQUEST);
        });

        if(chat.muteID.includes("jdecorte")) // mute  user
            throw new HttpException({ message: 'Input data validation failed' }, HttpStatus.BAD_REQUEST); 

        const messages = new Messages();
        messages.chatUUID = chat.uuid;
        messages.message = addMessageInput.message;
        messages.userID = "jdecorte";
        return await Messages.save(messages);
    }

    async getMessages(uuid : string) {
        const chatLogs = await Messages.find({
            where: {
              chatUUID: uuid,
            },
            order: {
              createdAt: 'ASC',
            },
          });
          return chatLogs;
    }

    async findAll() {
        return Messages.find();
    }

    // async findOne(uuid : string) {
    //     return Messages.findOneOrFail({
    //         where : {
    //             uuid : uuid,
    //         }
    //     }).catch(() => {
    //         throw new HttpException({ message : 'Input data validation failed'}, HttpStatus.BAD_REQUEST);
    //     });
    // }

    // async update(uuid: string, upInput : UpdateChatInput) {
    //     const chat = await this.findOne(uuid);

    //     chat.isAlive = upInput.isAlive !== undefined ? upInput.isAlive : chat.isAlive;
    //     chat.adminID = upInput.adminID ? upInput.adminID : chat.adminID;
    //     chat.userID = upInput.userID ? upInput.userID : chat.userID;
    //     chat.muteID = upInput.muteID ? upInput.muteID : chat.muteID;

    //     if(upInput.password && upInput.type) {
    //         this.checkValidPassword(upInput.type, upInput.password);
    //         chat.password = await bcrypt.hash(upInput.password, 10);
    //         chat.type = upInput.type;
    //     } else {
    //         chat.type = 'public';
    //         chat.password = '';
    //     }
    //     const err = await validate(chat);
    //     if(err.length > 0)
    //         throw new HttpException({ message : 'Input data validation failed'}, HttpStatus.BAD_REQUEST);
    //     else
    //         return await Chat.save(chat);
    // }

    // async remove(uuid : string) {
    //     const chat = await this.findOne(uuid);
    //     return await Chat.remove(chat);
    // }

    // async findAvailableChats(userID: string, type : string) {

    //     let additionalWhereClause = ![undefined, null, ''].includes(type) ? ` AND "type"='${type}'` : '';
    //     additionalWhereClause += ![undefined, null, ''].includes(userID)
    //       ? ` AND '${userID}'=ANY("userID")`
    //       : ` AND "type"!='dm'`;

    //     const chatList = await Chat.getRepository()
    //     .createQueryBuilder()
    //     .where('"isAlive" = true' + additionalWhereClause)
    //     .orderBy('"createdAt"')
    //     .getMany();
    //     return chatList;
    // }

    // async checkPassword(uuid: string, password: string) {
    //     const chat = await this.findOne(uuid);
    //     return await bcrypt.compare(password, chat.password);
    // }

    // private async checkUserIsInChat(uuid: string, userID: string) {
    //     const chat = await this.findOne(uuid);
    //     // const user = await User.findOneOrFail({
    //     //     where : {
    //     //         login : userID,
    //     //     },
    //     // })
    //     if(!chat.userID.includes(userID)) {
    //         throw new HttpException({ message : 'Input data validation failed'}, HttpStatus.BAD_REQUEST);
    //     }
    //     return chat;
    // }

    // async kick(uuid: string, userID: string) {
    //     const chat = await this.checkUserIsInChat(uuid, userID);

    //     chat.userID = chat.userID.filter((item) => item !== userID);
    //     return await Chat.save(chat);
    //   }

    // async toggleMute(uuid: string, userID: string) {
    //     const chat = await this.checkUserIsInChat(uuid, userID);

    //     chat.muteID = chat.muteID.includes(userID)
    //     ? chat.muteID.filter((item) => item !== userID)
    //     : [...chat.muteID, userID];
    //     return await Chat.save(chat);
    // }

    // async toggleAdmin(uuid: string, userID: string) {
    //     const chat = await this.checkUserIsInChat(uuid, userID);

    //     chat.adminID = chat.adminID.includes(userID)
    //     ? chat.adminID.filter((item) => item !== userID)
    //     : [...chat.adminID, userID];
    //     return await Chat.save(chat);
    // }

    // async sendDM(originID : string, destID: string) {

    // }

}