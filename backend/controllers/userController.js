import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create JWT token with expiry
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // normalize email
    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    // check password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      role: user.role,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.json({ success: false, message: "Server error" });
  }
};

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // normalize email
    const normalizedEmail = email.toLowerCase();

    // checking user already exists
    const exists = await userModel.findOne({ email: normalizedEmail });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validate email format
    if (!validator.isEmail(normalizedEmail)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    // validate strong password (optional but recommended)
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const newUser = new userModel({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Register error:", error);
    res.json({ success: false, message: "Server error" });
  }
};

export { loginUser, registerUser };
