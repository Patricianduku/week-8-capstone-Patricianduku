const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/messages/:roomId - Get message history
router.get('/:roomId', authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    // Validate room
    const validRooms = ['general', 'anxiety', 'depression', 'crisis'];
    if (!validRooms.includes(roomId)) {
      return res.status(400).json({ message: 'Invalid room' });
    }

    const messages = await Message.find({ room: roomId })
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    res.json({
      messages: messages.reverse(),
      currentPage: page,
      hasMore: messages.length === limit
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/messages - Save message (fallback)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { content, room } = req.body;

    // Validate input
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    if (content.length > 500) {
      return res.status(400).json({ message: 'Message too long' });
    }

    const validRooms = ['general', 'anxiety', 'depression', 'crisis'];
    if (!validRooms.includes(room)) {
      return res.status(400).json({ message: 'Invalid room' });
    }

    const message = new Message({
      sender: 'Anonymous',
      content: content.trim(),
      room,
      userId: req.user.userId,
      timestamp: new Date()
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error('Save message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
