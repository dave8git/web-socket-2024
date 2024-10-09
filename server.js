const express = require('express');
const path = require('path');
const app = express();
const messages = [];

app.use(express.static(__dirname));

app.get('*', (req, res) => { //renderuje wszystkie linki
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});