const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const createToken = (_id) => {
  // jwt.sign(payload, secret, options)
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please fill in the e-email and the password" });
  }

  try {
    const user = await User.login(email, password);
    const userId = user._id;
    const token = createToken(userId);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please fill in the e-email and the password" });
  }

  try {
    const user = await User.signup(email, password);
    const userId = user._id;
    const token = createToken(userId);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, signup };
