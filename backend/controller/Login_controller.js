const User = require('../model/User_model');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email is not registered" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Login success
    // Here you can generate JWT or set session if needed
    return res.status(200).json({ message: "Login successful", user });

    // You said after login go to homepage - frontend should handle this redirect after success response
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
