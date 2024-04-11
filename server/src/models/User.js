const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
  updatedAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isvalidatedPassword = async function (userSentPassword) {
  return await bcrypt.compare(userSentPassword, this.pasword);
};
//method -> methods로 변경 (오타!!! 소희 시치!!)
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
