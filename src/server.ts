import express, { Application } from 'express';
import { Server as SocketIOServer } from 'socket.io';
const socketIO = require('socket.io');
import { createServer, Server as HTTPServer } from 'http';
const path = require('path');


export class Server {
    private httpServer: HTTPServer = new HTTPServer();
    private app = express();
    private io: SocketIOServer = new SocketIOServer();

    private readonly DEFAULT_PORT = 5000;

    constructor() {
        this.initialize();
        this.handleRoutes();
        this.handleSocketConnection();
    }

    private initialize(): void {
        this.httpServer = createServer(this.app);
        this.io = socketIO(this.httpServer);
        this.configureApp();
        this.handleSocketConnection();
    }

    private handleRoutes(): void {
        this.app.get('/', (req, res) => {
            res.send('<h1>Hello World</h1>');
        });
    }

    private handleSocketConnection(): void {
        this.io.on('connection', socket => {
            console.log('Socket connected.');
        });
    }

    public listen(callback:(port:number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () => {
            callback(this.DEFAULT_PORT);
        });
    }

    private configureApp(): void {
        this.app.use(express.static(path.join(__dirname, '../public')));
    }
}