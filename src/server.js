import express from 'express';
import helmet from 'helmet';
import path , {dirname} from 'path';
import {fileURLToPath} from 'url';

const app = express();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = dirname(__filename);
console.log(__dirname);
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use(helmet());
app.get('/', (req,res)=>{
     // we will make this endpoint to point to homepage(landing page)
});

app.listen(PORT , ()=>{
    console.log(`Server has started on port: ${PORT}`);
});