import './app/helpers/loadEnv.js';
import http from 'http';
import debug from 'debug';
import app from './app/index';

const debugServer = debug('server');

process.on('unhandledRejection', (err) => {
    throw err;
});

process.on('uncaughtException', (err) => {
    console.log(err);
    process.exit(1);
});

const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port, () => {
    debugServer(`Launched at http://localhost:${port} (${process.env.NODE_ENV})`);
});
