const express = require('express');
require('dotenv').config();
const chats = require('./src/data/data');

const PORT = process.env.PORT || 5000;
const app = express();
app.listen(PORT, console.log(`server run on ${PORT}`));

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/chat', (req, res) => {
  res.send(chats);
});
app.get('/api/chat/:id', (req, res) => {
  const singleChat = chats.find(chat => chat._id === req.params.id);
  res.send(singleChat);
});
