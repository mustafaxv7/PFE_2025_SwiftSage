import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import con from './config/db.js';
import authRoutes from './routes/authRoutes.js';  
import reportRoutes from './routes/reportRoutes.js';     

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
app.use('/api',reportRoutes); // protected routes
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'client','dist','index.html'));
});

con.connect().then(()=>console.log('connected'));

app.listen(PORT , ()=>{
    console.log(`Server has started on port: ${PORT}`);
});
