let username;
const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessagesForm = document.querySelector('#add-messages-form'); 
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

loginForm.addEventListener('submit', login);

function login(e) {
    e.preventDefault(); // Prevent form submission

    const enteredUsername = userNameInput.value.trim(); // Get trimmed input value
    if (enteredUsername !== '') {
        username = enteredUsername;  // Set global username variable
        alert(`Correct username entered: ${username}`);
    } else {
        alert('Please enter a username');  // Show alert if no username entered
    }
}