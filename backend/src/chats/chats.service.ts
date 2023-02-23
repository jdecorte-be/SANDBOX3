import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Chat } from './entities/chat.entity';
import { IsUUID, validate } from 'class-validator';
import { AddChatInput } from './dto/addchat.input';
import { UpdateChatInput } from './dto/update.input';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';

@Injectable()
export class ChatsService {

    private checkValidName(name : string) {
        if(name.search(/[^a-zA-Z0-9]/g) !== -1 || name.trim() === '') {
            const error = {password: `Chat name need to be in english`}
            throw new HttpException({ message: 'Input data validation failed', error}, HttpStatus.BAD_REQUEST);
        }
    }

    private checkValidPassword(type : string, password : string) {
        if(type === 'private') {
            if(password === '' || password === undefined)
            {
                const error = { password: `Password can't be empty if type is private`}
                throw new HttpException({ message: 'Input data validation failed', error}, HttpStatus.BAD_REQUEST);
            }
        }
        else {
            if(password) {
                const error = { password: `Password need to be empty if type is public`}
                throw new HttpException({ message: 'Input data validation failed', error}, HttpStatus.BAD_REQUEST);
            }
        }
    }

    async addChat(addChatInput : AddChatInput) {
        const chat = new Chat();
        chat.name = addChatInput.name;
        chat.password = addChatInput.password;
        chat.type = addChatInput.type;
        chat.ownerID = addChatInput.ownerID;
        chat.userID = addChatInput.userID;
        this.checkValidName(chat.name);
        this.checkValidPassword(addChatInput.type, addChatInput.password);

        const err = await validate(chat);
        if(err.length > 0)
            throw new HttpException({ message: 'Input data validation failed' }, HttpStatus.BAD_REQUEST);
        else
            return await Chat.save(chat);
    }

    async findAll() {
        return Chat.find();
    }

    async findOne(uuid : string) {
        return Chat.findOneOrFail({
            where : {
                uuid : uuid,
            }
        }).catch(() => {
            throw new HttpException({ message : 'Input data validation failed'}, HttpStatus.BAD_REQUEST);
        });
    }

    async update(uuid: string, upInput : UpdateChatInput) {
        const chat = await this.findOne(uuid);

        chat.name = upInput.name !== undefined ? upInput.name : chat.name;
        chat.isAlive = upInput.isAlive !== undefined ? upInput.isAlive : chat.isAlive;
        chat.adminID = upInput.adminID ? upInput.adminID : chat.adminID;
        chat.userID = upInput.userID ? upInput.userID : chat.userID;
        chat.muteID = upInput.muteID ? upInput.muteID : chat.muteID;

        if(upInput.password && upInput.type) {
            this.checkValidPassword(upInput.type, upInput.password);
            chat.password = await bcrypt.hash(upInput.password, 10);
            chat.type = upInput.type;
        } else {
            chat.type = 'public';
            chat.password = '';
        }
        const err = await validate(chat);
        if(err.length > 0)
            throw new HttpException({ message : 'Input data validation failed'}, HttpStatus.BAD_REQUEST);
        else
            return await Chat.save(chat);
    }

    async remove(uuid : string) {
        const chat = await this.findOne(uuid);
        return await Chat.remove(chat);
    }

    async findAvailableChats(userID: string, type : string) {

        let additionalWhereClause = ![undefined, null, ''].includes(type) ? ` AND "type"='${type}'` : '';
        additionalWhereClause += ![undefined, null, ''].includes(userID)
          ? ` AND '${userID}'=ANY("userID")`
          : ` AND "type"!='dm'`;

        const chatList = await Chat.getRepository()
        .createQueryBuilder()
        .where('"isAlive" = true' + additionalWhereClause)
        .orderBy('"createdAt"')
        .getMany();
        return chatList;
    }

    async checkPassword(uuid: string, password: string) {
        const chat = await this.findOne(uuid);
        return await bcrypt.compare(password, chat.password);
    }

    private async checkUserIsInChat(uuid: string, userID: string) {
        const chat = await this.findOne(uuid);
        // const user = await User.findOneOrFail({
        //     where : {
        //         login : userID,
        //     },
        // })
        if(!chat.userID.includes(userID)) {
            throw new HttpException({ message : 'Input data validation failed'}, HttpStatus.BAD_REQUEST);
        }
        return chat;
    }

    async kick(uuid: string, userID: string) {
        const chat = await this.checkUserIsInChat(uuid, userID);

        chat.userID = chat.userID.filter((item) => item !== userID);
        return await Chat.save(chat);
      }

    async toggleMute(uuid: string, userID: string) {
        const chat = await this.checkUserIsInChat(uuid, userID);

        chat.muteID = chat.muteID.includes(userID)
        ? chat.muteID.filter((item) => item !== userID)
        : [...chat.muteID, userID];
        return await Chat.save(chat);
    }

    async toggleAdmin(uuid: string, userID: string) {
        const chat = await this.checkUserIsInChat(uuid, userID);

        chat.adminID = chat.adminID.includes(userID)
        ? chat.adminID.filter((item) => item !== userID)
        : [...chat.adminID, userID];
        return await Chat.save(chat);
    }

    async sendDM(originID : string, destID: string) {

    }

}