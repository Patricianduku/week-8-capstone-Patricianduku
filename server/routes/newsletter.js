import express from 'express';

// In-memory storage for demo; replace with DB in production
const subscribers = [];

const router = express.Router();

router.post('/', (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }
  if (subscribers.includes(email)) {
    return res.status(409).json({ message: 'Email already subscribed.' });
  }
  subscribers.push(email);
  res.status(200).json({ message: 'Subscribed successfully!' });
});

export default router; 