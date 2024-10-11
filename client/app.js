const socket = io();
socket.on('message', ({author, content}) => addMessage(author, content));
let userName;
const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessagesForm = document.querySelector('#add-messages-form'); 
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

loginForm.addEventListener('submit', login);
addMessagesForm.addEventListener('submit', sendMessage);

function login(e) {
    e.preventDefault();

    const enteredUsername = userNameInput.value.trim();
    if (enteredUsername !== '') {
        userName = enteredUsername;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
        socket.emit('join', userName);
        socket.emit('welcome', 'Chat-Bot');
    } else {
        alert('Please enter a username');
    }
}

function sendMessage(e) {
    e.preventDefault();  
    let messageContent = messageContentInput.value;
    console.log(messageContent);
    if(messageContent === '') {
        alert('Please write something?!');
    } else {
        addMessage(userName, messageContent); 
        socket.emit('message', {author: userName, content: messageContent});
        messageContentInput.value = '';
    }
}

const addMessage = (author, content) => {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if (author === userName) {
        message.classList.add('message--self')
    } else if (author === 'Chat-Bot') {
        message.classList.add('bot')
    }
    message.innerHTML +=
        `<h3 class="message__author">${author === userName ? 'You' : author}</h3>
        <div class="message__content"> ${content} </div>`

    messagesList.appendChild(message);
};