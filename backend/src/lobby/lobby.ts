import io from 'socket.io-client';
import { Gaming } from '../Canvas';

class Lobby {
    id: string;
    Players: string [];
    Instance : Gaming;
    constructor(id: string) {
        this.Instance = new Gaming(1000, 1000);
        this.id = id;
        this.Players = [];
    }
}

export class LobbyManager {
    LobbyList: Lobby[];

    constructor() {
        this.LobbyList = [];
    }

    createLobby() {
        const lobby = new Lobby(this.LobbyList.length.toString());
        this.LobbyList.push(lobby);
        return lobby;
    }
    JoinLobby(id: string) {
        const tLobby = this.LobbyList.find((lobby) => lobby.id === id);
        if (tLobby && tLobby.Players.length < 2)
        {
            if (tLobby.Players.push('Name'))
                return tLobby;
        }
        else
            throw new Error('Lobby not found or full');
    }
    LeaveLobby(id: string) {
        const tLobby = this.LobbyList.find((lobby) => lobby.id === id);
        if (tLobby)
        {
            tLobby.Players.pop();
            return tLobby;
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
}