import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import journalRoutes from './routes/journalRoutes.js';
import resourcesRoutes from './routes/resourcesRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import newsletterRoutes from './routes/newsletter.js';
import errorHandler from './middleware/errorHandler.js';
import setupSocket from './socket/index.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// --- Place API routes FIRST ---
app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/newsletter', newsletterRoutes);

// --- Then a root route for health check ---
app.get('/', (req, res) => {
  res.send('Tuliza API is running.');
});

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI);

setupSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
