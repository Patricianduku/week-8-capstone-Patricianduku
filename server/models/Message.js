import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    default: 'Anonymous',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 500
  },
  room: {
    type: String,
    required: true,
    enum: ['general', 'anxiety', 'depression', 'crisis']
  },
  userId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying
messageSchema.index({ room: 1, timestamp: -1 });

const Message = mongoose.model('Message', messageSchema);
export default Message;


