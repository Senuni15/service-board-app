const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc   Register user

const registerUser = async (req, res) => {
  try {
    console.log(req.body); // 👈 ADD THIS FOR DEBUG

    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error); // 👈 IMPORTANT
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser };