import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Messages } from './entities/messages.entity';
import { MessagesService } from './messages.service';
import { AddMessageInput } from './dto/addmessage.input';

@Resolver(() => Messages)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    ) {}

    @Mutation(() => Messages)
    addMessage(@Args('addMessageInput') addMessageInput: AddMessageInput) {
      return this.messagesService.addMessage(addMessageInput);
    }

    @Query(() => [Messages], { name: 'getMessages' })
    findChatLogsFromChat(@Args('uuid', { type: () => String }) uuid: string) {
      return this.messagesService.getMessages(uuid);
    }

    @Query(() => [Messages], { name: 'getAllMessages' })
    findAll() {
      return this.messagesService.findAll();
    }

  
    // @Mutation(() => Messages)
    // removeChat(@Args('uuid', { type: () => String }) uuid: string) {
    //   return this.chatsService.remove(uuid);
    // }
  
    // @Query(() => Boolean, { name: 'checkChatPassword' })
    // checkPassword(
    //   @Args('uuid', { type: () => String }) uuid: string,
    //   @Args('password', { type: () => String }) password: string,
    // ) {
    //   return this.chatsService.checkPassword(uuid, password);
    // }
  

}