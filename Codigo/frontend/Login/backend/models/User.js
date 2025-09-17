import { Client } from 'pg';
import { hash } from 'bcryptjs';

const client = new Client({
    host: 'localhost',
    database: 'seu_banco',
    user: 'seu_usuario',
    password: 'sua_senha',
});

client.connect();

export async function createUser(username, password) {
    const hashedPassword = await hash(password, 10);
    const result = await client.query('INSERT INTO users(username, password) VALUES($1, $2) RETURNING id', [username, hashedPassword]);
    return result.rows[0];
}
export async function findUserByUsername(username) {
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
}
