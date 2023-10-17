const mongoose = require("mongoose");
//bcrypt package to encrpyt password
const bcrypt = require("bcrypt");
//validator package to validate email and password is acceptable
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//create static model
// cannot use arrow function else this. does not work
userSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email });

  //validation
  if (!email || !password) {
    throw Error(" All Fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password is not strong enough. Password needs to have uppercase, alphanumeric and special character"
    );
  }

  if (exists) {
    throw Error("Email already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};
//create static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error(" All Fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);
  // user.password is the hashed password while password is the plain text

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("user", userSchema);
