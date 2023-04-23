import pg from 'pg';

const { Client } = pg;

// Connecte Client to BDD
const client = new Client(process.env.DATABASE_URL);

client.connect();

export default client;
