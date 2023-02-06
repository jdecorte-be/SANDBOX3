/* eslint-disable prettier/prettier */
import io from 'socket.io-client';
import { Socket } from 'socket.io';

let canvas: any;
let context: any;

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

class Player
{
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    score: number;
    min: number;
    max: number;
    speed: number;
    name: string;
    moveUp:boolean;
    moveDown:boolean
    constructor(x: number, y: number, width: number, height: number, color: string, score: number, min: number, max: number, speed: number)
    {
        this.x = x;
        this.y = y - height / 2;
        this.width = width;
        this.height = height;
        this.color = color;
        this.score = score;
        this.min = min;
        this.max = max;
        this.speed = speed;
        this.moveDown = false;
        this.moveUp = false;
    }
    PaddleUp()
    {
        if (this.y - this.speed >= - 20)
            this.y -= this.speed;
    }
    PaddleDown()
    {
        if (this.y + this.speed + this.height <= this.max + 20)
            this.y += this.speed;
    }
    RandomColor() {
        this.color = '#'+ Math.floor(Math.random() * 16777215).toString(16);
    }
}

class Ball
{
    x: number;
    y: number;
    radius: number;
    speed: number;
    velocityX: number;
    velocityY: number;
    color: string;
    custom = false;
    constructor(x: number, y: number, radius: number, speed: number, velocityX: number, velocityY: number, color: string)
    {
        this.x = x / 2;
        this.y = y / 2;
        this.radius = radius;
        this.speed = speed;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.color = color;
    }
    RandomColor() {
        this.color = '#'+ Math.floor(Math.random() * 16777215).toString(16);
    }
}

export class gameInfo {
    Balling: Ball;
    Player1: Player;
    Player2: Player;
    Connected : string [];
    Running: boolean;
    CDimension: { width: number; height: number };

    constructor(widths: number, heights: number) {
        this.Running = false;
        this.Connected = []
        this.CDimension = { width: widths, height: heights };
        this.Balling = new Ball(widths, heights, 10, 10, 5, 0, 'red');
        this.Player1 = new Player(0, 500, 20, 100, '#1542d3', 0, 0, heights, 10);
        this.Player2 = new Player(widths - 20, (heights / 2), 20, 100, '#05f315', 0, 0, heights, 10);
    }
    CheckMove(id: string){
        console.log(this.Connected);
        if (this.Connected.indexOf(id) === 0)
            return this.Player1;
        else if (this.Connected.indexOf(id) === 1)
            return this.Player2;
    }
    MoveHandler(){
        if (this.Player1.moveUp === true)
            this.Player1.PaddleUp();
        if (this.Player1.moveDown === true)
            this.Player1.PaddleDown();
        if (this.Player2.moveUp === true)
            this.Player2.PaddleUp();
        if (this.Player2.moveDown === true)
            this.Player2.PaddleDown();
    }
    setMove(id: string, move: string, state: boolean){
        if (move === "UP") {
            if (this.Connected.indexOf(id) === 0)
                this.Player1.moveUp = state;
            else if (this.Connected.indexOf(id) === 1)
                this.Player2.moveUp = state;
        }
        else if (move === "DOWN") {
            if (this.Connected.indexOf(id) === 0)
                this.Player1.moveDown = state;
            else if (this.Connected.indexOf(id) === 1)
                this.Player2.moveDown = state;
        }
    }
}


export class Gaming {
    i = 0;
    intID: any;
    Info: gameInfo;

    constructor(width: number, height: number) {
        this.Info = new gameInfo(width, height);
        this.intID = -1;
    }

    getInfo(): gameInfo {
        return this.Info;
    }
    rendering(Client:Socket) {
        console.log(this.Info.Connected.length);
        console.log("Rendering...");
        if (this.Info.Running === true)
            return;
        if (this.Info.Connected.length === 2)
        {
            this.Info.Running = true;
            this.intID = setInterval(() => {
                this.UpdateBall();
            }, 1000 / 60);
        }
        else
            return this.intID = -1;
    }
    Disconnect(id: string) {
        const index = this.getInfo().Connected.indexOf(id);
        if (this.getInfo().Running === false) {

            if (index > -1) {
                this.getInfo().Connected.splice(index, 1);
            }
            return "CONTINUE";
        }
        else if (index > -1) {
            this.getInfo().Running = false;
                return "STOP";
        }
        return "CONTINUE";
    }
    collision(b: any, p: any) {
        b.top = this.Info.Balling.y - this.Info.Balling.radius;
        b.bottom = this.Info.Balling.y + this.Info.Balling.radius;
        b.left = this.Info.Balling.x - b.radius;
        b.right = this.Info.Balling.x + b.radius;

        p.top = p.y;
        p.bottom = p.y + p.height;
        p.left = p.x;
        p.right = p.x + p.width;
        return (b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom);
    }

    public UpdateBall() {
        if (this.Info.Connected.length < 2){
            clearInterval(this.intID);
            this.Info.Running = false;
            console.log("Game Stopped");
            return;
        }
        this.Info.MoveHandler();
        this.Info.Balling.x += this.Info.Balling.velocityX;
        this.Info.Balling.y += this.Info.Balling.velocityY;
        if (this.Info.Balling.x - this.Info.Balling.radius < 0) {
            this.Info.Player2.score++;
            this.ReplaceBall(1);
            return;
        }
        else if (this.Info.Balling.x + this.Info.Balling.radius > this.Info.CDimension.width) {
            this.Info.Player1.score++;
            this.ReplaceBall(0);
            return;
        }
        if (this.Info.Balling.y + this.Info.Balling.radius > this.Info.CDimension.height || this.Info.Balling.y - this.Info.Balling.radius < 0)
            this.Info.Balling.velocityY = -this.Info.Balling.velocityY;
        const player: string = this.Info.Balling.x < this.Info.CDimension.width / 2 ? 'u1' : 'u2';
        if (player === 'u1' && this.collision(this.Info.Balling, this.Info.Player1))
        {
            console.log('u1');
            if (this.getInfo().Balling.custom === true) {
                this.getInfo().Balling.RandomColor();
                this.getInfo().Player1.RandomColor();
            }
            let colPoint: number = this.Info.Balling.y - (this.Info.Player1.y + this.Info.Player1.height / 2);
            colPoint = colPoint / (this.Info.Player1.height / 2);
            const angleRad: number = (colPoint * Math.PI) / 4;
            const direction: number = this.Info.Balling.x < this.Info.CDimension.width / 2 ? 1 : -1;

            this.Info.Balling.velocityX = direction * this.Info.Balling.speed * Math.cos(angleRad);
            this.Info.Balling.velocityY = this.Info.Balling.speed * Math.sin(angleRad);
            if (this.Info.Balling.speed < 20)
                this.Info.Balling.speed += 0.5;
        }
        else if (player === 'u2' && this.collision(this.Info.Balling, this.Info.Player2))
        {
            console.log('u2');
            if (this.getInfo().Balling.custom === true) {
                this.getInfo().Balling.RandomColor();
                this.getInfo().Player2.RandomColor();
            }
            let colPoint: number = this.Info.Balling.y - (this.Info.Player2.y + this.Info.Player2.height / 2);
            colPoint = colPoint / (this.Info.Player2.height / 2);
            const angleRad: number = (colPoint * Math.PI) / 4;
            const direction: number = this.Info.Balling.x < this.Info.CDimension.width / 2 ? 1 : -1;

            this.Info.Balling.velocityX = direction * this.Info.Balling.speed * Math.cos(angleRad);
            this.Info.Balling.velocityY = this.Info.Balling.speed * Math.sin(angleRad);
            if (this.Info.Balling.speed < 20)
                this.Info.Balling.speed += 0.5;
        }

    }

    ReplaceBall(i: number) {
        //console.log('fdp');
        this.Info.Balling.x = this.Info.CDimension.width / 2;
        this.Info.Balling.y = this.Info.CDimension.height / 2;

        this.Info.Balling.speed = 10;
        this.Info.Balling.velocityY = 0;
        this.Info.Balling.velocityX = -5;
        if (i === 0) {
            this.Info.Balling.velocityX = 5;
            this.Info.Balling.velocityY = 0;
        }
    }
}