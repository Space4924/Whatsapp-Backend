import express from 'express';
import Connection from './database.js';
import route from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', route);
const PORT = 8000;
const server = createServer(app);



Connection();


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})





let users = [];
const addUser = (userData, socketId) => {
    !users.some(user => user.sub == userData.sub) && users.push({ ...userData, socketId })
}

const getUser = (userId) => {
    return users.find(user => user.sub === userId)
}


io.on('connection', (socket) => {
    console.log(`user Connected ${socket.id}`);

    socket.on("addUser", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    })

    socket.on('sendMessage', data => {
        const user = getUser(data.receiverId);
        io.to(user?.socketId).emit('getMessage', data);
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected',socket.id);
    });
})


server.listen(PORT, () =>
    console.log(`Server is running Succesfully on PORT: ${PORT}`));