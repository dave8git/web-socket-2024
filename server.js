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
        const user = users.find(user => user.id == socket.id);
        // console.log('socket.id disconnec', socket.id);
        // console.log('user disconnect', user);
        // console.log('Oh, socket ' + socket.id + ' has left');
        if(user) {
            socket.broadcast.emit('message', { author: 'Chat-Bot', content: `${user.username} has left the building!`});
            const userIndex = users.indexOf(socket.io);
            users.splice(userIndex, 1);

        }
        console.log(users);
    });
    socket.on('join', (userName) => {
        console.log('user joined: ', userName);
        users.push({'username': userName, 'id': socket.id});
        console.log('users from join', users);
        socket.broadcast.emit('message', {
            author: 'Chat-Bot',
            content: `${userName} has joined the conversation`
        });
    });
    console.log('I\'ve added a listener on message event \n');
});