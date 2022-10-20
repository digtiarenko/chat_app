const express = require('express');
const connectDB = require('./src/config/db');
require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const {
  notFound,
  errorHandler,
} = require('./src/middleWares/ErrorMiddlewares');
const path = require('path');
const userRoutes = require('./src/routes/userRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const messageRoutes = require('./src/routes/messageRoutes');

const { PORT } = process.env;
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
//Deployment================
const basedir = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', '/frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'),
    );
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}
//Deployment================

const server = app.listen(
  PORT,
  console.log(`server is runing on port: ${PORT}`.green.bold),
);
app.use(notFound);
app.use(errorHandler);

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: { origin: 'http://localhost:3000' },
});

io.on('connection', socket => {
  console.log('Connected to socket.io'.blue.bold);
  socket.on('setup', userData => {
    socket.join(userData._id);
    console.log('userData._id', userData._id);
    socket.emit('connected');
  });

  socket.on('joinChat', room => {
    socket.join(room);
    console.log('User joined room', room);
  });

  socket.on('typing', room => {
    socket.in(room).emit('typing');
  });
  socket.on('stop typing', room => {
    socket.in(room).emit('stop typing');
  });

  socket.on('new message', newMessageRecieved => {
    let chat = newMessageRecieved.chat;

    if (!chat.users) {
      return console.log('chat.users not defiened');
    }
    chat.users.forEach(user => {
      socket.broadcast
        .to(user._id)
        .emit('message recieved', newMessageRecieved);
      // if (user._id === newMessageRecieved.sender._id) return;
      // socket.in(user._id).emit('message recieved', newMessageRecieved);
    });
  });

  socket.off('setup', () => {
    socket.leave(userData._id);
  });
});
