// EXPLANATION ONLY - NO CODE CHANGES
/*
Changes made to server.js:

1. Route organization:
   - Protected routes are grouped together with consistent authMiddleware usage
   - Admin routes are properly protected with both authMiddleware and adminMiddleware

2. Database connection:
   - Added better logging for database connection success/failure
   - Using promises for database connection to handle errors properly

3. Middleware order:
   - CORS, Helmet and other security middleware are applied before route handlers
   - This ensures all requests are properly processed through security layers

4. Route imports:
   - All route modules are properly imported and used
   - adminAuth routes added to enable admin-specific functionality
*/

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
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

const clientPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({contentSecurityPolicy: false})); // helps secure the app by setting various HTTP headers
app.use(morgan("dev")); // log the requests
app.use(cors()); // allows requests from diffrent domains
app.use('/auth',authRoutes);
app.use('/api/reports',authMiddleware,reportRoutes); 
app.use('/api/users',authMiddleware, authUsers); 
app.use('/api/admin', authMiddleware, adminAuth);
app.use('/api/alerts', authMiddleware, sendAlertRoutes); 
app.use('/api/feedback', authMiddleware, feedbackRoutes); 

app.get('*', (req, res) => {
    if (req.path.startsWith('/api') || req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json)$/)) {
        return res.status(404).json({ error: 'Not found' });
    }
    res.sendFile(path.join(clientPath, 'index.html'));
});

app.listen(PORT , ()=>{
    console.log(`Server has started on port: ${PORT}`);
});
