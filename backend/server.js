const express = require('express');
const connectDB = require('./src/config/db');
require('dotenv').config();
const chats = require('./src/data/data');
const colors = require('colors');

const PORT = process.env.PORT;

console.log('PORT', PORT);
const app = express();
connectDB();

app.listen(PORT, console.log(`server is runing on port: ${PORT}`.green.bold));

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
