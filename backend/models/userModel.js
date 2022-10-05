const { Schema, Model } = require('mongoose');

const userModel = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    img: {
      type: String,
      required: true,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
  },
  { timestamps: true, versionKey: false },
);

const User = Model('User', userModel);

module.exports = User;
