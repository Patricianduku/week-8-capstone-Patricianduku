import express from 'express';
import { getRoomMessages, postRoomMessage } from '../controllers/chatController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:room', auth, getRoomMessages);
router.post('/:room', auth, postRoomMessage);

export default router; 