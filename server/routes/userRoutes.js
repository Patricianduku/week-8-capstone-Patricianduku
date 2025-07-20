import express from 'express';
import { registerUser, getUsers, changePassword, submitMpesaCode, approvePremium } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.get('/', getUsers);
router.patch('/change-password', authMiddleware, changePassword);
router.post('/submit-mpesa', submitMpesaCode);
router.post('/approve-premium', approvePremium);

export default router;
