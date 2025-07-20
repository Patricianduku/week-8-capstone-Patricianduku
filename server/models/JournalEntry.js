import mongoose from 'mongoose';

const journalEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  moodScore: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  emoji: {
    type: String,
    required: false
  },
  note: {
    type: String,
    maxlength: 500
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);
export default JournalEntry;
