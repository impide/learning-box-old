/*
import dotenv from 'dotenv'; dotenv.config(process.env.NODE_ENV);

on ne peut pas utiliser le chargement des variables d'environnement directement dans l'index, car
ESlint et la bonne pratique dit que l'on ne peut pas faire d'instruction JS avant de faire tous nos
import de modules. Donc les variable contenu dans le .env ne seront mis en place dans process.env,
qu'après la récupération du module app.js.

Cela est problématique car, du coup, notre application de connaitra pas les valeurs de celle-ci.
*/
import './app/helpers/loadEnv.js';
import http from 'http';
import debug from 'debug';
import app from './app/index.js';

const debugServer = debug('server');

// Gestion des erreurs inattendu, qui n'ont pas été retournées par le seveur
process.on('unhandledRejection', (err) => {
    throw err;
});

/* 1 - Uncaught Fatal Exception: There was an uncaught exception
and it was not handled by a domain or an uncaughtException event handler. */
process.on('uncaughtException', (err) => {
    // eslint-disable-next-line no-console
    console.log(err);
    process.exit(1);
});

const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port, () => {
    debugServer(`Launched at http://localhost:${port} (${process.env.NODE_ENV})`);
});
