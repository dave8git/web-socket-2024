const express = require('express');
const path = require('path');
const app = express();
const messages = [];

app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname, '/client')));

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});