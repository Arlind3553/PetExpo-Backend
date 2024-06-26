import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/dbConfig.js';
import birdRoutes from './routes/birdsRoutes.js';
import catRoutes from './routes/catsRoutes.js';
import dogRoutes from './routes/dogsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'
import cors from 'cors';

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// API routes
app.use('/api/birds', birdRoutes);
app.use('/api/cats', catRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/user', userRoutes);
app.use('/api/uploads', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
