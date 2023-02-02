import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    ConnectedSocket,
} from '@nestjs/websockets';
import {
    Body,
    CACHE_MANAGER,
    Controller,
    Get,
    Inject,
    Post,
    Req,
    Request,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { Gaming } from '../Canvas';
import { LobbyManager } from '../lobby/lobby';
import { JwtAuthenticationGuard, LocalAuthGuard } from '../authentication/authentication.guard';
import { AuthenticationService } from '../authentication/authentication.service'
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "../authentication/jwt.strategy";
import { ConfigService } from "@nestjs/config";

@WebSocketGateway(3002, { cors: { origin: true, credentials: true } })
export class GameGateway {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly authService: AuthenticationService,
        private readonly userService: UsersService,
        private readonly jwtStrategy: JwtStrategy,
        PlayerConnected: any,

    ) {
    }
    //gameInstance = new Gaming(1000, 1000);
    LobbyManager = new LobbyManager();
    // @UseGuards(JwtAuthenticationGuard)
    // @SubscribeMessage('events')
    // handleEvent(
    //     @MessageBody() data: string,
    //     @ConnectedSocket() client: Socket,
    // ): any {
    //
    //     this.LobbyManager.createLobby();
    //     //this.LobbyManager.getLobbyInstance('0').rendering(client);
    //     //return this.LobbyManager.getLobbyInstance('0').Info;
    // }

    afterInit(server: any) {
        console.log('Game server initialized');
    }
    @UseGuards(JwtAuthenticationGuard)
    async handleConnection(client: Socket, ){
        console.log('Player connected !');
        if (!client || client === undefined) {
            console.log('No client provided');
        }
        if (client.handshake.headers.authorization === undefined || !client.handshake.headers.authorization) {
            console.log('No token provided');
            client.disconnect();
            return;
        }
        const token = client.handshake.headers.authorization.split(' ')[1];
        const secret = this.configService.get('JWT_SECRET')
        const info = this.jwtService.verify(token, { secret: secret });
        client.data.username = info.login;
        console.log('Token provided');
    }

    @SubscribeMessage('CreateLobby')
    handleCreateLobby(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        console.log('Attempting to create a lobby');
        this.LobbyManager.createLobby();
        console.log(this.LobbyManager.LobbyList.length);

    }
    @SubscribeMessage('JoinLobby')
    handleJoinLobby(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        console.log('Player joining lobby', client.data.username);
        this.LobbyManager.JoinLobby(client.data.username);
    }

    @SubscribeMessage('LeaveLobby')
    handleLeaveLobby(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        this.LobbyManager.LeaveLobby(client.data.username);

    }

    handleDisconnect(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        console.log('Player disconnected');
        this.LobbyManager.LeaveLobby('0');
        this.LobbyManager.printLobby();
        //this.LobbyManager.getLobbyInstance('0').Info.Connected[0] = "";
    }

    @SubscribeMessage('LobbyInfo')
    handleLobbyInfo(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        if (!client || client === undefined)
            console.log('AH');
        console.log(client.handshake.headers.authorization)
        console.log(`${client.data.username}' - asking for lobby info`);
        this.LobbyManager.printLobby();
    }

    @SubscribeMessage('PaddleUp')
    handlePaddleUp(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        try {
            //this.LobbyManager.getLobbyInstance('0').Info.CheckMove(client.id).PaddleUp();
        } catch (e) {
            console.log(e);
        }
    }

    @SubscribeMessage('PaddleDown')
    handlePaddleDown(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        try {
            //this.LobbyManager.getLobbyInstance('0').Info.CheckMove(client.id).PaddleDown();
        } catch (e) {
            console.log(e);
        }
    }
}