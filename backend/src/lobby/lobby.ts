import io from 'socket.io-client';
import { Gaming } from '../Canvas';
import {Server, Socket} from 'socket.io';

class Lobby {
    id: string;
    Players: string [];
    Instance : Gaming;
    Ready : string [];
    Spectators : string [];
    Rainbow : boolean;
    socketing: Map<string, Socket> = new Map<string, Socket>();
    constructor(id: string) {
        this.Instance = new Gaming(1000, 1000);
        this.Instance.intID = id;
        this.id = id;
        this.Players = [];
        this.Ready = [];
        this.Spectators = [];
        this.Rainbow = false;
    }
}

export class LobbyManager {
    LobbyList: Lobby[];
    Room : Server;

    constructor() {
        this.LobbyList = [];
    }
    createLobby(Mode: 'Rainbow' | 'Classic'): Lobby {
        const lobby = new Lobby(this.LobbyList.length.toString());
        this.LobbyList.push(lobby);
        if (Mode === 'Rainbow')
            lobby.Rainbow = true;
        lobby.Instance.getInfo().Balling.custom = lobby.Rainbow;
        return lobby;
    }
    JoinLobby(login: string, client: Socket) {

        let id = 0;
        if (this.isInLobby(login))
            throw new Error('Player already in lobby');
        let tLobby;
        if (this.LobbyList.length === 0)
            throw new Error('No lobby available');
        tLobby = this.LobbyList.at(id);
        while (tLobby) {

            if (tLobby && tLobby.Players.length < 2) {
                tLobby.id = id.toString();
                if (tLobby.Players.push(login)) {
                    tLobby.socketing.set(login, client);
                    client.join(tLobby.id);
                    tLobby.Instance.setRoom(this.Room);
                    
                    console.log('client joined lobby ' + tLobby.id.toString());
                    if (tLobby.Players.length === 2) {
                        tLobby.Instance.setRoom(this.Room);
                        tLobby.socketing.get(tLobby.Players[0])?.emit('Ready');
                        tLobby.socketing.get(tLobby.Players[1])?.emit('Ready');
                        return;
                    }
                    client.emit('Waiting Room');
                    return tLobby;
                }
            }
            id++;
            tLobby = this.LobbyList.at(id);
        }
        throw new Error('Lobby not found or full');
    }
    LeaveLobby(login: string) {
        const tLobby = this.LobbyList.find((lobby) => lobby.Players.includes(login));
        const tLobbySpec = this.LobbyList.find((lobby) => lobby.Spectators.includes(login));
        if (tLobbySpec)
        {
            const index = tLobbySpec.Spectators.indexOf(login);
            if (index > -1)
                tLobbySpec.Spectators.splice(index, 1);
        }
        if (tLobby)
        {
            const index = tLobby.Players.indexOf(login);
            if (index > -1) {
                if (tLobby.Instance.Disconnect(login) === "STOP")
                {
                    if (tLobby.Instance.getInfo().Player1.name === login)
                    {
                        tLobby.socketing.get(tLobby.Instance.getInfo().Player2.name)?.emit("GameWon");
                        tLobby.socketing.get(tLobby.Instance.getInfo().Player1.name)?.emit("Disconnected");
                        console.log('Player 1 won');

                    }
                    else if (tLobby.Instance.getInfo().Player2.name === login)
                    {
                        tLobby.socketing.get(tLobby.Instance.getInfo().Player1.name)?.emit("GameWon");
                        tLobby.socketing.get(tLobby.Instance.getInfo().Player2.name)?.emit("Disconnected");
                        console.log('Player 2 won');
                    }
                    else
                        console.log("Draw");
                }
                tLobby.Players.splice(index, 1);
                tLobby.socketing.delete(login);
                tLobby.Instance.getInfo().Connected.splice(index, 1);
                if (tLobby.Ready.includes(login))
                    tLobby.Ready.splice(index, 1);
                this.LobbyList.splice(this.LobbyList.indexOf(tLobby), 1);
            }
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
            console.log('Lobby/Instance not found');
        return undefined;
    }
    isInLobby(login: string) {
        const tLobby = this.LobbyList.find((lobby) => lobby.Players.includes(login));
        if (tLobby)
            return true;
        else
            return false;
    }
    getUserLobby(login: string) {
        const tLobbySpec = this.LobbyList.find((lobby) => lobby.Spectators.includes(login));
        const tLobby = this.LobbyList.find((lobby) => lobby.Players.includes(login));
        if (tLobbySpec)
            return tLobbySpec;
        if (tLobby)
            return tLobby;
        else
            throw new Error('Player not in a lobby');
    }
    SpectatorJoin(login: string, client: Socket) {
        if (this.isInLobby(login))
            throw new Error('Player already in lobby');
        let id = 0;
        let tLobby;
        tLobby = this.LobbyList.at(id);
        while (tLobby) {
            if (tLobby && tLobby.Spectators.length < 2) {
                if (tLobby.Spectators.push(login)) {
                    tLobby.socketing.set(login, client);
                    return tLobby;
                }
            }
            id++;
            tLobby = this.LobbyList.at(id);
        }
        throw new Error('Lobby not found or full');
    }
    isSpectating(login: string) {
        const tLobby = this.LobbyList.find((lobby) => lobby.Spectators.includes(login));
        if (tLobby)
            return true;
        else
            return false;
    }
    LeaveSpectating(login: string) {
        const tLobby = this.LobbyList.find((lobby) => lobby.Spectators.includes(login));
        if (tLobby)
        {
            const index = tLobby.Spectators.indexOf(login);
            if (index > -1)
                tLobby.Spectators.splice(index, 1);
        }
    }

}