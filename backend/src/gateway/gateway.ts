import { OnModuleInit, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { SignDto } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';

@UsePipes(new ValidationPipe())
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3001'],
  },
})
export class Gateway implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthenticationService,
  ) {}
  @WebSocketServer()
  server = new Server();

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id, ': Connected');
    });
  }

  @SubscribeMessage('register')
  async register(@MessageBody() body: SignDto) {
    const newUser = await this.usersService.signUp(body);
    if (newUser) {
      console.log(newUser);
      this.server.emit('register', newUser);
    }
    this.server.emit('signup_error', newUser);
  }

  @SubscribeMessage('login')
  async login(@MessageBody() body: SignDto) {
    const user = await this.usersService.signIn(body);
    if (user) {
      const log = await this.authService.login(body);
      this.authService.getCookieWithJwtToken(user.id);
      this.server.emit('logged', log);
      this.server.emit('login', user);
    }
  }
}
