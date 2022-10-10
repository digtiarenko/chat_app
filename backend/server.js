const express = require('express');
const connectDB = require('./src/config/db');
require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const {
  notFound,
  errorHandler,
} = require('./src/middleWares/ErrorMiddlewares');
const userRoutes = require('./src/routes/userRoutes');
const chatRoutes = require('./src/routes/chatRoutes');

const { PORT } = process.env;
const app = express();
connectDB();
app.listen(PORT, console.log(`server is runing on port: ${PORT}`.green.bold));
app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.use(notFound);
app.use(errorHandler);
