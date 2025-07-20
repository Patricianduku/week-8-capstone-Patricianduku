import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// @desc   Register new user
// @route  POST /api/users
export const registerUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Get all users
// @route  GET /api/users
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit M-Pesa code for premium
export const submitMpesaCode = async (req, res) => {
  try {
    const { name, email, mpesaCode } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, subscription: 'pending', mpesaCode });
    } else {
      user.mpesaCode = mpesaCode;
      user.subscription = 'pending';
      await user.save();
    }
    res.json({ message: 'Submitted for verification' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve premium (admin)
export const approvePremium = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.subscription = 'premium';
    await user.save();
    res.json({ message: 'User upgraded to premium' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
