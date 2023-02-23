import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { UpdateChatInput } from './dto/update.input';
import { AddChatInput } from './dto/addchat.input';
import { MessagesService } from '../Messages/messages.service';
import { Messages } from '../Messages/entities/messages.entity';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: MessagesService,
    ) {}

    @Mutation(() => Chat)
    addChat(@Args('addChatInput') addChatInput: AddChatInput) {
      return this.chatsService.addChat(addChatInput);
    }

    @Query(() => [Chat], { name: 'chats' })
    findAll() {
      return this.chatsService.findAll();
    }

    @Query(() => Chat, { name: 'chats' })
    findOne(@Args('uuid', { type: () => String }) uuid: string) {
        return this.chatsService.findOne(uuid);
    }

    @Mutation(() => Chat)
    updateChat(@Args('updateChatInput') updateChatInput: UpdateChatInput) {
      return this.chatsService.update(updateChatInput.uuid, updateChatInput);
    }
  
    @Mutation(() => Chat)
    removeChat(@Args('uuid', { type: () => String }) uuid: string) {
      return this.chatsService.remove(uuid);
    }
  
    @Query(() => [Chat], { name: 'aliveChats' })
    findAliveChats(
      @Args('userID', { type: () => String, nullable: true }) userID: string,
      @Args('type', { type: () => String, nullable: true }) type: string,
    ) {
      return this.chatsService.findAvailableChats(userID, type);
    }
  
    @ResolveField(() => [Messages])
    getMessages(@Parent() chat: Chat) {
      return this.messagesService.getMessages(chat.uuid);
    }
  
    @Query(() => Boolean, { name: 'checkChatPassword' })
    checkPassword(
      @Args('uuid', { type: () => String }) uuid: string,
      @Args('password', { type: () => String }) password: string,
    ) {
      return this.chatsService.checkPassword(uuid, password);
    }
  
    @Mutation(() => Chat)
    toggleMute(
      @Args('uuid', { type: () => String }) uuid: string,
      @Args('userID', { type: () => String }) userID: string,
    ) {
      return this.chatsService.toggleMute(uuid, userID);
    }
  
    @Mutation(() => Chat)
    forcedOut(
      @Args('uuid', { type: () => String }) uuid: string,
      @Args('userID', { type: () => String }) userID: string,
    ) {
      return this.chatsService.kick(uuid, userID);
    }
  
    @Mutation(() => Chat)
    toggleAdmin(
      @Args('uuid', { type: () => String }) uuid: string,
      @Args('userID', { type: () => String }) userID: string,
    ) {
      return this.chatsService.toggleAdmin(uuid, userID);
    }
  
    // @Mutation(() => Chat)
    // createDM(
    //   @Args('user1', { type: () => String }) origUserID: string,
    //   @Args('user2', { type: () => String }) destUserID: string,
    // ) {
    //   return this.chatsService.addDM(origUserID, destUserID);
    // }
}