import { Server } from 'socket.io';
import Message from '../models/Message.js';

const roomUserCounts = {};

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    socket.on('joinRoom', ({ room, anonymousTag }) => {
      socket.join(room);
      socket.data.anonymousTag = anonymousTag;

      // Track user count
      roomUserCounts[room] = (roomUserCounts[room] || 0) + 1;
      io.to(room).emit('activeUsers', roomUserCounts[room]);
    });

    socket.on('sendMessage', async ({ room, content }) => {
      const message = await Message.create({
        sender: socket.data.anonymousTag || 'Anonymous',
        content,
        room,
        userId: 'anon',
        timestamp: new Date()
      });
      io.to(room).emit('newMessage', message);
    });

    socket.on('disconnecting', () => {
      for (const room of socket.rooms) {
        if (room !== socket.id) {
          roomUserCounts[room] = Math.max((roomUserCounts[room] || 1) - 1, 0);
          io.to(room).emit('activeUsers', roomUserCounts[room]);
        }
      }
    });
  });

  setInterval(async () => {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await Message.deleteMany({ timestamp: { $lt: cutoff } });
  }, 60 * 60 * 1000);
}

export default setupSocket; 