import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import pkg from 'body-parser';
import cors from 'cors';

dotenv.config();

const { json } = pkg;

const app = express();


app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));


app.use(json());

app.use('/auth', router);

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
