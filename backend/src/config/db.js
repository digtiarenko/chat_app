const mongoose = require('mongoose');
require('dotenv').config();
const colors = require('colors');

const { DB_HOST } = process.env;

console.log('DB_HOST', DB_HOST);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongo DB connected ${conn.connection.host}`.green.bold);
  } catch (error) {
    console.log(`DB connection failed. ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
