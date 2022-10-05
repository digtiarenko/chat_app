const { Schema, Model } = require('mongoose');

const messageModel = Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
    },
  },
  { timestamps: true, versionKey: false },
);

const Message = Model('Message', messageModel);

module.exports = Message;
