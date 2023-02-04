import io from 'socket.io-client';
import { Gaming } from '../Canvas';
import {Server, Socket} from 'socket.io';

class Lobby {
    id: string;
    Players: string [];
    Instance : Gaming;
    Ready : string [];
    socketing: Map<string, Socket> = new Map<string, Socket>();
    constructor(id: string) {
        this.Instance = new Gaming(1000, 1000);
        this.id = id;
        this.Players = [];
        this.Ready = [];
    }
}

export class LobbyManager {
    LobbyList: Lobby[];

    constructor() {
        this.LobbyList = [];
    }

    createLobby() {
        if (this.LobbyList.length === 2)
            throw new Error('Lobby limit reached');
        const lobby = new Lobby(this.LobbyList.length.toString());
        this.LobbyList.push(lobby);
        return lobby;
    }
    JoinLobby(login: string, client: Socket) {
        let id = 0;
        if (this.isInLobby(login))
            throw new Error('Player already in lobby');
        let tLobby;
        tLobby = this.LobbyList.find((lobby) => lobby.id === id.toString());
        while (tLobby && id < 2) {
            if (tLobby && tLobby.Players.length < 2) {
                if (tLobby.Players.push(login)) {
                    tLobby.socketing.set(login, client);
                    if (tLobby.Players.length === 2) {
                        tLobby.socketing.get(tLobby.Players[0])?.emit('Ready');
                        tLobby.socketing.get(tLobby.Players[1])?.emit('Ready');
                        return;
                    }
                    client.emit('Waiting Room');
                    return tLobby;
                }
            }
            id++;
            tLobby = this.LobbyList.find((lobby) => lobby.id === id.toString());
        }
        throw new Error('Lobby not found or full');
    }
    LeaveLobby(login: string) {
        if (!this.isInLobby(login))
            throw new Error('Player not in a lobby');
        const tLobby = this.LobbyList.find((lobby) => lobby.Players.includes(login));
        if (tLobby)
        {
            const index = tLobby.Players.indexOf(login);
            if (index > -1)
                tLobby.Players.splice(index, 1);
        }

    }
    printLobby() {
        console.log(this.LobbyList);
    }
    getLobbyInstance(id: string) {
        const tLobby = this.LobbyList.find((lobby) => lobby.id === id);
        if (tLobby)
            return tLobby.Instance;
        else
            //throw new Error('Lobby/Instance not found');
            console.log('Lobby/Instance not found');
    }
    isInLobby(login: string) {
        const tLobby = this.LobbyList.find((lobby) => lobby.Players.includes(login));
        if (tLobby)
            return true;
        else
            return false;
    }
    getUserLobby(login: string) {
        const tLobby = this.LobbyList.find((lobby) => lobby.Players.includes(login));
        if (tLobby)
            return tLobby;
        else
            throw new Error('Player not in a lobby');
    }
}