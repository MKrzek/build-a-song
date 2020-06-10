const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  password: String,
});

UserSchema.pre('save', function save(next) {
  const user = this;
  console.log('preee', user);
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    console.log('user.pass', user.password);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      console.log('hash', hash);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    console.log('cannn', candidatePassword, this.password);
    cb(err, isMatch);
  });
};

mongoose.model('user', UserSchema);
