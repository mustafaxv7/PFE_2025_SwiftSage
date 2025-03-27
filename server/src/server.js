import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path , {dirname} from 'path';
import {fileURLToPath} from 'url';
import con from './config/db.js';
import authRoutes from './routes/authRoutes.js';       

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5030;

// const __filename = fileURLToPath(import.meta.url);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.use(express.json());
app.use(helmet({contentSecurityPolicy: false})); // helps secure the app by setting various HTTP headers
app.use(morgan("dev")); // log the requests
app.use(cors()); // allows requests from diffrent domains
app.use('/auth',authRoutes);
console.log(__dirname);
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'client','dist','index.html'));
});

con.connect().then(()=>console.log('connected'));

app.listen(PORT , ()=>{
    console.log(`Server has started on port: ${PORT}`);
});
