import Message from '../models/Message.js';

// @desc   Get recent messages for a room (last 24h)
// @route  GET /api/chat/:room
export const getRoomMessages = async (req, res) => {
  try {
    const { room } = req.params;
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const messages = await Message.find({ room, timestamp: { $gte: since } }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Post a new message to a room
// @route  POST /api/chat/:room
export const postRoomMessage = async (req, res) => {
  try {
    const { room } = req.params;
    const { content, anonymousTag } = req.body;
    const message = await Message.create({
      sender: anonymousTag || 'Anonymous',
      content,
      room,
      userId: req.user.id
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
