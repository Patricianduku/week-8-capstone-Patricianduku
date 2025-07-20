import express from 'express';
import { getJournalEntries, createJournalEntry } from '../controllers/journalController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', auth, getJournalEntries);
router.post('/', auth, createJournalEntry);

export default router;
