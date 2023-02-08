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
import { Socket, Server } from 'socket.io';
import { Gaming } from '../Canvas';
import { LobbyManager } from '../lobby/lobby';
import { JwtAuthenticationGuard, LocalAuthGuard } from '../authentication/authentication.guard';
import { AuthenticationService } from '../authentication/authentication.service'
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "../authentication/jwt.strategy";
import { ConfigService } from "@nestjs/config";
import {DISCONNECT_EVENT} from "@nestjs/websockets/constants";

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
    LobbyManager = new LobbyManager();
    Moving = false;

    afterInit(server: Server) {
        console.log('Game server initialized');
        this.LobbyManager.Room = server;
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
    @SubscribeMessage('PlayerReady')
    handlePlayerReady(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        console.log(`${client.data.username} is ready to play`);
        if (this.LobbyManager.isInLobby(client.data.username))
            this.LobbyManager.getUserLobby(client.data.username).Ready.push(client.data.username);
        if (this.LobbyManager.getUserLobby(client.data.username).Ready.length === 2) {
            this.LobbyManager.getUserLobby(client.data.username).Instance.Info.Connected.push(this.LobbyManager.getUserLobby(client.data.username).Ready[0]);
            this.LobbyManager.getUserLobby(client.data.username).Instance.Info.Connected.push(this.LobbyManager.getUserLobby(client.data.username).Ready[1]);
            this.LobbyManager.getUserLobby(client.data.username).Instance.Info.Player1.name = this.LobbyManager.getUserLobby(client.data.username).Ready[0];
            this.LobbyManager.getUserLobby(client.data.username).Instance.Info.Player2.name = this.LobbyManager.getUserLobby(client.data.username).Ready[1];
            this.LobbyManager.getUserLobby(client.data.username).Instance.rendering(client);
        }
    }
    @SubscribeMessage('Spectate')
    handleSpectate(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        console.log(`${client.data.username} want to spectate lobby 0`);
        if (this.LobbyManager.getLobbyInstance('0') === undefined || this.LobbyManager.LobbyList[0].Ready.length < 2) {
            throw new Error('No lobby to spectate');
        }
        this.LobbyManager.SpectatorJoin(client.data.username, client);
        client.emit('SpectateReady');
    }
    @SubscribeMessage('CreateLobby')
    handleCreateLobby(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        console.log('Attempting to create a lobby');
        this.LobbyManager.createLobby("Classic");
        console.log(this.LobbyManager.LobbyList.length);

    }
    @SubscribeMessage('CreateRainbowLobby')
    handleCreateRainbowLobby(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        console.log('Attempting to create A Rainbow lobby');
        this.LobbyManager.createLobby("Rainbow");
        console.log(this.LobbyManager.LobbyList.length);

    }
    @SubscribeMessage('JoinLobby')
    handleJoinLobby(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        console.log('Player joining lobby', client.data.username);
        this.LobbyManager.JoinLobby(client.data.username, client);
    }

    @SubscribeMessage('LeaveLobby')
    handleLeaveLobby(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        this.LobbyManager.LeaveLobby(client.data.username);

    }

    async handleDisconnect(client : Socket){
        if (!client || client === undefined)
            return ;
        if (this.LobbyManager.isSpectating(client.data.username))
            this.LobbyManager.LeaveSpectating(client.data.username);
        if (this.LobbyManager.isInLobby(client.data.username)) {
            this.LobbyManager.LeaveLobby(client.data.username);
        }
        console.log(`${client.data.username} has been disconnected`);
    }

    @SubscribeMessage('LobbyInfo')
    handleLobbyInfo(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        if (!client || client === undefined)
            return ;
        console.log(client.handshake.headers.authorization)
        console.log(`${client.data.username}' - asking for lobby info`);
        this.LobbyManager.printLobby();
    }

    @SubscribeMessage('PaddleUp')
    async handlePaddleUp(client: Socket, state: boolean
    ) {
            if (!this.LobbyManager.getUserLobby(client.data.username)?.Instance.Info.CheckMove(client.data.username))
                return;
            if (this.LobbyManager.getUserLobby(client.data.username)?.Instance.Info.CheckMove(client.data.username)?.moveUp !== undefined)
                this.LobbyManager.getUserLobby(client.data.username)?.Instance.Info.setMove(client.data.username, "UP", state);
    }

    @SubscribeMessage('PaddleDown')
    async handlePaddleDown(client: Socket, state: boolean,
    ) {
        if (!this.LobbyManager.getUserLobby(client.data.username)?.Instance.Info.CheckMove(client.data.username))
            return;
        if (this.LobbyManager.getUserLobby(client.data.username)?.Instance.Info.CheckMove(client.data.username)?.moveUp !== undefined)
            this.LobbyManager.getUserLobby(client.data.username)?.Instance.Info.setMove(client.data.username, "DOWN", state);
    }
}