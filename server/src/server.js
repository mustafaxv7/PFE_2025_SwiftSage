import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import con from './config/db.js';
import authRoutes from './routes/authRoutes.js';  
import reportRoutes from './routes/reportRoutes.js'; 
import authMiddleware from './middleware/authMiddleware.js';    
import authUsers from './routes/authUsers.js';
import adminAuth from './routes/adminAuth.js';
import sendAlertRoutes from './routes/sendAlertRoutes.js'; 
import { get } from 'http';
import { getAlerts } from './controllers/getAlerts.js';
import { send } from 'process';
import feedbackRoutes from './routes/feedbackRoutes.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5030;

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({contentSecurityPolicy: false})); // helps secure the app by setting various HTTP headers
app.use(morgan("dev")); // log the requests
app.use(cors()); // allows requests from diffrent domains
app.use('/auth',authRoutes);
app.use('/api/reports',authMiddleware,reportRoutes); // protected routes
app.use('/api/users',authMiddleware, authUsers); 
app.use('/api/admin', authMiddleware, adminAuth);
app.use('/api/sendAlert', authMiddleware, sendAlertRoutes); 
app.use('/api/getAlerts', authMiddleware, sendAlertRoutes);
app.use('/api/sendFeedback',feedbackRoutes);
app.use('/api/getFeedback',authMiddleware,feedbackRoutes); 
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'client','dist','index.html'));
});

try{
   await con.connect();
   console.log('DB Connected!');
}catch(err){
   console.error('DB connection failed:', err);
   process.exit(1);
}

app.listen(PORT , ()=>{
    console.log(`Server has started on port: ${PORT}`);
});
