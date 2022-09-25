const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// creating static signup method (custom method added to the User model)
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!validator.isEmail(email)) {
    throw new Error("E-mail is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) throw new Error("Email already in use");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hashedPassword,
  });

  return user;
};

// creating static login method (custom method added to the User model)
userSchema.statics.login = async function (email, password) {
  // validation
  if (!validator.isEmail(email)) {
    throw new Error("E-mail is not valid");
  }

  const user = await this.findOne({ email });

  if (!user) throw new Error("Invalid e-mail");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new Error("Invalid password");

  return user;
};

module.exports = mongoose.model("User", userSchema);
