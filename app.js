let username;
const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessagesForm = document.querySelector('#add-messages-form'); 
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

loginForm.addEventListener('submit', login);

function login(e) {
    e.preventDefault();

    const enteredUsername = userNameInput.value.trim();
    if (enteredUsername !== '') {
        username = enteredUsername;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    } else {
        alert('Please enter a username');
    }
}

addMessagesForm.addEventListener('submit', sendMessage);

function sendMessage(e) {
    e.preventDefault();

    const enteredMessage = messageContentInput.value.trim();
    if (enteredMessage !== '') {
        addMessage(username, enteredMessage);
    } else {
        alert('Wpisz treść wiadomości.')
    }
}

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === username) message.classList.add('message--self');
    message.innerHTML = `
        <h3 class="message__author">${username == author ? 'You' : author}</h3>
        <div class="message__content">
            ${content}
        </div>
    `;
    messagesList.appendChild(message);
}

