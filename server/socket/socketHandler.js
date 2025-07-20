const Message = require('../models/Message');

module.exports = (io) => {
  // Track online users per room
  const roomUsers = new Map();

  io.on('connection', (socket) => {
    console.log(`User ${socket.userId} connected`);

    // Join room handler
    socket.on('joinRoom', async (roomId) => {
      try {
        // Validate room
        const validRooms = ['general', 'anxiety', 'depression', 'crisis'];
        if (!validRooms.includes(roomId)) {
          socket.emit('error', { message: 'Invalid room' });
          return;
        }

        socket.join(roomId);
        socket.currentRoom = roomId;

        // Track user in room
        if (!roomUsers.has(roomId)) {
          roomUsers.set(roomId, new Set());
        }
        roomUsers.get(roomId).add(socket.userId);

        // Send message history (last 50 messages)
        const messages = await Message.find({ room: roomId })
          .sort({ timestamp: -1 })
          .limit(50)
          .lean();

        socket.emit('messageHistory', messages.reverse());

        // Notify room about new user
        socket.to(roomId).emit('userJoined', {
          message: 'Someone joined the room',
          timestamp: new Date()
        });

        // Send online users count
        io.to(roomId).emit('onlineUsers', roomUsers.get(roomId).size);

        console.log(`User ${socket.userId} joined room ${roomId}`);
      } catch (error) {
        console.error('Join room error:', error);
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    // Send message handler
    socket.on('sendMessage', async (data) => {
      try {
        const { roomId, content } = data;

        // Validate message
        if (!content || content.trim().length === 0) {
          socket.emit('error', { message: 'Message cannot be empty' });
          return;
        }

        if (content.length > 500) {
          socket.emit('error', { message: 'Message too long' });
          return;
        }

        // Create and save message
        const message = new Message({
          sender: 'Anonymous',
          content: content.trim(),
          room: roomId,
          userId: socket.userId,
          timestamp: new Date()
        });

        await message.save();

        // Broadcast message to room
        io.to(roomId).emit('receiveMessage', {
          _id: message._id,
          sender: message.sender,
          content: message.content,
          room: message.room,
          userId: message.userId,
          timestamp: message.timestamp
        });

        console.log(`Message sent in room ${roomId} by user ${socket.userId}`);
      } catch (error) {
        console.error('Send message error:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Typing indicator handler
    socket.on('typing', (data) => {
      const { roomId, isTyping } = data;
      socket.to(roomId).emit('userTyping', {
        userId: socket.userId,
        isTyping
      });
    });

    // Leave room handler
    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
      
      // Remove user from room tracking
      if (roomUsers.has(roomId)) {
        roomUsers.get(roomId).delete(socket.userId);
        
        // Notify room about user leaving
        socket.to(roomId).emit('userLeft', {
          message: 'Someone left the room',
          timestamp: new Date()
        });

        // Update online users count
        io.to(roomId).emit('onlineUsers', roomUsers.get(roomId).size);
      }

      console.log(`User ${socket.userId} left room ${roomId}`);
    });

    // Disconnect handler
    socket.on('disconnect', () => {
      // Remove user from all rooms
      roomUsers.forEach((users, roomId) => {
        if (users.has(socket.userId)) {
          users.delete(socket.userId);
          socket.to(roomId).emit('userLeft', {
            message: 'Someone left the room',
            timestamp: new Date()
          });
          io.to(roomId).emit('onlineUsers', users.size);
        }
      });

      console.log(`User ${socket.userId} disconnected`);
    });
  });
};
