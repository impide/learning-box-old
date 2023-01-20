import express from 'express';
import cors from 'cors';
import path from 'path';
import * as url from 'url';
import router from './routes/index.js';

const app = express();
const dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Style
app.use(express.static('public'));

// Ejs
app.set('view engine', 'ejs');
app.set('views', path.join(dirname, '..', 'views/pages'));

// Body-Parser accepting application/json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow a list or all domains to access this API
app.use(cors(process.env.CORS_DOMAINS ?? '*'));

//  Tell Express to use the images stored in publics
app.use('/images', express.static(path.join('../public/images')));
app.use('/files', express.static(path.join('../public/files')));

app.use(router);

export default app;
