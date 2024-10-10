const express = require('express');
const path = require('path');
const app = express();
const messages = [];
const users = []; 
const socket = require('socket.io');
// const socket = io({
//     autoConnect: false
// });

app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname, '/client')));

const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('message', ({ author, content }) => addMessage(author, content));

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('disconnect', () => { 
        console.log('Oh, socket ' + socket.id + ' has left');
        const userIndex = users.indexOf(socket.io);
        users.splice(userIndex, 1);
        console.log(users);
    });
    socket.on('join', (userName) => {
        console.log('user joined: ', userName);
        users.push(userName);
        console.log(users);
    });
    console.log('I\'ve added a listener on message event \n');
});