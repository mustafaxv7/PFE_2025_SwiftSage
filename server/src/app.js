import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import { authenticate } from './core/middleware/auth.js';
import { authLimiter, apiLimiter } from './core/middleware/rateLimiter.js';
import { errorHandler } from './core/middleware/errorHandler.js';
import { requestId } from './core/middleware/requestId.js';

import authRoutes from './modules/auth/auth.routes.js';
import usersRoutes from './modules/users/users.routes.js';
import reportsRoutes from './modules/reports/reports.routes.js';
import alertsRoutes from './modules/alerts/alerts.routes.js';
import feedbackRoutes from './modules/feedback/feedback.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
    const app = express();
    app.set('trust proxy', 1);

    app.use(requestId);
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "https://maps.googleapis.com", "https://maps.gstatic.com"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                imgSrc: ["'self'", "data:", "https:", "blob:"],
                fontSrc: ["'self'", "https://fonts.gstatic.com"],
                connectSrc: ["'self'", "https://maps.googleapis.com"],
                frameSrc: ["'self'", "https://www.google.com"],
            },
        },
        crossOriginEmbedderPolicy: false,
    }));

    const allowedOrigins = [
        'https://swiftsage.onrender.com',
        'http://localhost:5173',
        'http://localhost:5030',
    ];

    app.use(cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    }));

    const clientPath = path.resolve(__dirname, '../../client/dist');
    if (fs.existsSync(clientPath)) {
        app.use(express.static(clientPath, {
            setHeaders: (res, filePath) => {
                if (filePath.endsWith('.js')) {
                    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
                } else if (filePath.endsWith('.css')) {
                    res.setHeader('Content-Type', 'text/css; charset=utf-8');
                }
                res.setHeader('X-Content-Type-Options', 'nosniff');
            },
        }));
    }

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/auth', authLimiter, authRoutes);
    app.use('/api/users', authenticate, apiLimiter, usersRoutes);
    app.use('/api/reports', authenticate, apiLimiter, reportsRoutes);
    app.use('/api/alerts', authenticate, apiLimiter, alertsRoutes);
    app.use('/api/feedback', authenticate, apiLimiter, feedbackRoutes);

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

    app.use(errorHandler);

    return app;
}
