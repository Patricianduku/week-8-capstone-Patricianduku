import mongoose from 'mongoose';

const chatRoomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  topic: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
export default ChatRoom;
