import JournalEntry from '../models/JournalEntry.js';

// @desc   Get all journal entries for the authenticated user
// @route  GET /api/journal
export const getJournalEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Create a new journal entry
// @route  POST /api/journal
export const createJournalEntry = async (req, res) => {
  try {
    const { moodScore, emoji, note } = req.body;
    const entry = await JournalEntry.create({
      userId: req.user.id,
      moodScore,
      emoji,
      note
    });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
