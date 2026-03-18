/*
Changes made to server.js:

1. Diagnostic Logging:
   - Added explicit logging of the static files directory path on startup.
   - Added a check to verify if the 'client/dist' folder exists and log errors if not.

2. Path Resolution:
   - Switched to 'path.resolve' for more robust absolute path calculation.

3. Middleware Order:
   - Moved Morgan (logging) and Helmet (security) to the top to ensure all requests are tracked and secured.
   - Configured Helmet to be compatibility-friendly with Vite-generated assets.

4. Catch-all Route:
   - Improved the SPA catch-all to handle missing index.html gracefully and return clear 404s for missing assets.
*/
import fs from 'fs';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import con from './config/db.js';
import authRoutes from './routes/authRoutes.js';  
import reportRoutes from './routes/reportRoutes.js'; 
import authMiddleware from './middleware/authMiddleware.js';    
import authUsers from './routes/authUsers.js';
import adminAuth from './routes/adminAuth.js';
import sendAlertRoutes from './routes/sendAlertRoutes.js';  
import feedbackRoutes from './routes/feedbackRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5030;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Logging & Security Middleware (Top Priority)
app.use(morgan("dev")); 
app.use(cookieParser());app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));
app.use(cors({
    origin: true,
    credentials: true
}));

// 2. Static File Path Resolution & Diagnostics
const clientPath = path.resolve(__dirname, '../../client/dist');
console.log(`[Server] Searching for frontend at: ${clientPath}`);

if (!fs.existsSync(clientPath)) {
    console.warn(`[Server] WARNING: Frontend 'dist' folder NOT FOUND at ${clientPath}`);
    console.warn(`[Server] Please ensure you have run 'npm run build' in the root or client directory.`);
} else {
    console.log(`[Server] Frontend 'dist' folder found.`);
}

// 3. Static File Serving
app.use(express.static(clientPath));

// 4. Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. API Routes
app.use('/auth',authRoutes);
app.use('/api/reports',authMiddleware,reportRoutes); 
app.use('/api/users',authMiddleware, authUsers); 
app.use('/api/admin', authMiddleware, adminAuth);
app.use('/api/alerts', authMiddleware, sendAlertRoutes); 
app.use('/api/feedback', authMiddleware, feedbackRoutes); 

app.get('*', (req, res) => {
    // If it's an API request or a file that should have been caught by express.static
    if (req.path.startsWith('/api') || req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json)$/)) {
        console.log(`[Server] 404 for asset/api: ${req.path}`);
        return res.status(404).json({ error: 'Not found' });
    }
    
    // Serve index.html for all other routes (SPA routing)
    const indexPath = path.join(clientPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        console.error(`[Server] Critical Error: index.html not found at ${indexPath}`);
        res.status(404).send('Frontend application not found. Please verify deployment build.');
    }
});

app.listen(PORT , ()=>{
    console.log(`Server has started on port: ${PORT}`);
});
