import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import con from './config/db.js';
import authRoutes from './routes/authRoutes.js';  
import reportRoutes from './routes/reportRoutes.js'; 
import { authMiddleware } from './middleware/authMiddleware.js';    
import authUsers from './routes/authUsers.js';
import adminAuth from './routes/adminAuth.js';
import sendAlertRoutes from './routes/sendAlertRoutes.js';  
import feedbackRoutes from './routes/feedbackRoutes.js';

const app = express();
const PORT = process.env.PORT || 5030;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Security & Logging Middleware (Top Priority)
app.use(morgan("dev")); 
app.use(cookieParser());
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));

// Restricted CORS Whitelist
const allowedOrigins = [
    'https://swiftsage.onrender.com',
    'http://localhost:5173', // Local Dev
    'http://localhost:5030'  // Local Prod
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Rate Limiting
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again after 15 minutes"
});

// 2. Static File Path Resolution & Diagnostics
const clientPath = path.resolve(__dirname, '../../client/dist');
if (fs.existsSync(clientPath)) {
    console.log(`[Server] Frontend 'dist' folder found.`);
}

// 3. Static File Serving (BEFORE rate limits for performance)
app.use(express.static(clientPath, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        } else if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css; charset=utf-8');
        }
        res.setHeader('X-Content-Type-Options', 'nosniff');
    }
}));

// 4. Body Parsing (BEFORE API Routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. API Routes (WITH Protections)
app.use('/auth', authLimiter, authRoutes);
app.use('/api/reports', authMiddleware, reportRoutes); 
app.use('/api/users', authMiddleware, authUsers); 
app.use('/api/admin', authMiddleware, adminAuth);
app.use('/api/alerts', authMiddleware, sendAlertRoutes); 
app.use('/api/feedback', authMiddleware, feedbackRoutes); 

app.get('*', (req, res) => {
    if (req.path.startsWith('/api') || req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json)$/)) {
        return res.status(404).json({ error: 'Not found' });
    }
    
    const indexPath = path.join(clientPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('Frontend application not found.');
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Port ${PORT} is already in use.`);
        console.error(`   Run this to free it: npx kill-port ${PORT}`);
        console.error(`   Then run: npm start\n`);
        process.exit(1);
    } else {
        throw err;
    }
});
