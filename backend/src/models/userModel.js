const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const { HASH_POWER } = process.env;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified) {
    next();
  }
  this.password = await bcrypt.hash(this.password, Number(HASH_POWER));
});

const User = model('User', userSchema);

module.exports = User;
