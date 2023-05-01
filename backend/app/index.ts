import express from 'express';
import cors from 'cors';
import path from 'path';
import router from './routes/index';

const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ['http://localhost:2000'];
const options: cors.CorsOptions = { origin: allowedOrigins };
app.use(cors(options));

app.use('/images', express.static(path.join('../public/images')));
app.use('/files', express.static(path.join('../public/files')));

app.use(router);

export default app;
