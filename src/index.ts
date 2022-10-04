import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import path from 'path';

const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer);

app.use(express.static(path.resolve(__dirname, '..', 'public')));

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on('message', message => {
        socket.emit('received', `Received message ${message}`);
    })
});

httpServer.listen(3333);
