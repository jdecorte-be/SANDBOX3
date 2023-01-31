import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Gaming } from '../Canvas';
import { LobbyManager } from '../lobby/lobby';
import {UseGuards} from "@nestjs/common";
import { JwtAuthenticationGuard, LocalAuthGuard } from '../authentication/authentication.guard';

@WebSocketGateway(3002, { cors: { origin: true, credentials: true } })
export class GameGateway {
    //gameInstance = new Gaming(1000, 1000);
    LobbyManager = new LobbyManager();
    PlayerConnected = [];
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

    handleConnection(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        console.log('Player connected !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
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
        console.log('Player joining lobby', data);
        this.LobbyManager.JoinLobby(data);
    }

    @SubscribeMessage('LeaveLobby')
    handleLeaveLobby(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        console.log('Player leaving lobby');
        this.LobbyManager.LeaveLobby('0');
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
        console.log('Player asking for lobby info');
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